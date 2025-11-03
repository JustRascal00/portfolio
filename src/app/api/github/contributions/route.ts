import { NextResponse } from 'next/server';

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubContributionsResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: ContributionWeek[];
        };
      };
    };
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  // Get GitHub token from environment variables (optional, works without token but rate-limited)
  const token = process.env.GITHUB_TOKEN || '';

  // Fetch multiple years of data (GitHub API limits to 1 year per query)
  // We'll make multiple queries and combine them
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;
  
  // Fetch last 3 years - one query per year
  // For current year: Jan 1 to today
  // For past years: Jan 1 to Dec 31
  const yearQueries = [];
  const currentYear = now.getFullYear();
  
  for (let yearOffset = 0; yearOffset < 3; yearOffset++) {
    const targetYear = currentYear - yearOffset;
    
    // Start date: Jan 1 of target year at midnight
    const fromDate = new Date(Date.UTC(targetYear, 0, 1, 0, 0, 0, 0));
    
    // End date: Dec 31 of target year, or today if it's the current year
    const toDate = yearOffset === 0 
      ? new Date(now) // Current year - use today
      : new Date(Date.UTC(targetYear, 11, 31, 23, 59, 59, 999)); // Past years - use end of year
    
    yearQueries.push({
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
      year: targetYear
    });
    
    console.log(`Year ${targetYear} query:`, {
      from: fromDate.toISOString().split('T')[0],
      to: toDate.toISOString().split('T')[0],
      fromDateStr: fromDate.toLocaleDateString(),
      toDateStr: toDate.toLocaleDateString()
    });
  }

  try {
    // Make multiple queries (one per year) and combine results
    const contributionMap = new Map<string, number>();

    for (const yearQuery of yearQueries) {
      try {
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
            Accept: 'application/vnd.github.v4+json',
          },
          body: JSON.stringify({
            query,
            variables: { username, from: yearQuery.from, to: yearQuery.to },
          }),
        });

        const responseData = await response.json();

        if (response.ok && !responseData.errors && responseData.data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
          // Extract contribution days from this year
          responseData.data.user.contributionsCollection.contributionCalendar.weeks.forEach((week: ContributionWeek) => {
            week.contributionDays.forEach((day: ContributionDay) => {
              // Combine contributions for the same date
              const existing = contributionMap.get(day.date) || 0;
              contributionMap.set(day.date, existing + day.contributionCount);
            });
          });
          
          console.log(`Fetched year ${yearQuery.year}:`, {
            from: yearQuery.from.split('T')[0],
            to: yearQuery.to.split('T')[0]
          });
        } else if (responseData.errors) {
          console.warn(`GraphQL error for year ${yearQuery.year}:`, responseData.errors[0]?.message);
        }
      } catch (error) {
        console.warn(`Failed to fetch year ${yearQuery.year}:`, error);
      }
    }

    // Convert map to array and sort
    if (contributionMap.size > 0) {
      const contributions = Array.from(contributionMap.entries())
        .map(([date, count]) => ({ date, contributionCount: count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      console.log('Combined GraphQL response:', {
        totalDays: contributions.length,
        totalContributions: contributions.reduce((sum, day) => sum + day.contributionCount, 0),
        dateRange: {
          from: contributions[0]?.date,
          to: contributions[contributions.length - 1]?.date
        },
        sampleDays: contributions.slice(-10) // Last 10 days
      });

      return NextResponse.json({ contributions });
    }

    // Fallback to REST API if GraphQL didn't work
    console.log('GraphQL failed, falling back to REST API');
    const restResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!restResponse.ok) {
      throw new Error('Failed to fetch GitHub data');
    }

    const events = await restResponse.json();
    
    // Process REST API events into contribution format
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const restContributionMap = new Map<string, number>();

    // Initialize all days for last 3 years
    const threeYearsAgoDate = new Date(today);
    threeYearsAgoDate.setFullYear(today.getFullYear() - 3);
    const currentDate = new Date(threeYearsAgoDate);
    
    while (currentDate <= today) {
      const dateStr = currentDate.toISOString().split('T')[0];
      restContributionMap.set(dateStr, 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Count contributions from events
    events.forEach((event: { created_at?: string }) => {
      if (event.created_at) {
        const eventDate = new Date(event.created_at).toISOString().split('T')[0];
        if (restContributionMap.has(eventDate)) {
          const current = restContributionMap.get(eventDate) || 0;
          restContributionMap.set(eventDate, current + 1);
        }
      }
    });

    // Convert to array format
    const contributions = Array.from(restContributionMap.entries())
      .map(([date, count]) => ({ date, contributionCount: count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    console.log('REST API fallback response:', {
      totalDays: contributions.length,
      totalContributions: contributions.reduce((sum, day) => sum + day.contributionCount, 0),
      sampleDays: contributions.slice(-10) // Last 10 days
    });

    return NextResponse.json({ contributions });
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub contributions', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

