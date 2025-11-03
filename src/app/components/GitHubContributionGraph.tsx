'use client';
import { useState, useEffect, useRef } from 'react';
import { useI18n } from './i18n';

interface ContributionData {
  date: string;
  count: number;
}

export default function GitHubContributionGraph({ username }: { username: string }) {
  const { t } = useI18n();
  const [contributions, setContributions] = useState<ContributionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Fetch from our API route which uses GitHub GraphQL API
        const response = await fetch(`/api/github/contributions?username=${username}`);

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const data = await response.json();
        
        console.log('GitHub API response:', { 
          contributionsLength: data.contributions?.length,
          firstFew: data.contributions?.slice(0, 10),
          hasError: data.error,
          responseKeys: Object.keys(data),
          sampleItem: data.contributions?.[0]
        });
        
        if (data.error) {
          console.error('API returned error:', data.error);
          throw new Error(data.error);
        }
        
        if (!data.contributions || !Array.isArray(data.contributions)) {
          console.error('Invalid response format:', {
            contributions: data.contributions,
            type: typeof data.contributions,
            isArray: Array.isArray(data.contributions),
            fullResponse: data
          });
          throw new Error('Invalid response format');
        }
        
        if (data.contributions.length === 0) {
          console.warn('No contributions found - API returned empty array');
        } else {
          console.log(`Found ${data.contributions.length} contribution days`);
        }

        // Convert API response to our format
        const contributionData: ContributionData[] = data.contributions.map((item: { date: string; contributionCount: number }) => {
          // Validate date format from API
          const testDate = new Date(item.date);
          if (isNaN(testDate.getTime())) {
            console.warn('Invalid date from API:', item.date);
          }
          return {
            date: item.date,
            count: item.contributionCount || 0
          };
        });

        // Fill in missing days (pad gaps)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const threeYearsAgo = new Date(today);
        threeYearsAgo.setFullYear(today.getFullYear() - 3);
        
        const fullData: ContributionData[] = [];
        const contributionMap = new Map(contributionData.map(d => [d.date, d.count]));
        
        // Generate all days for last 3 years
        const currentDate = new Date(threeYearsAgo);
        while (currentDate <= today) {
          const dateStr = currentDate.toISOString().split('T')[0];
          const contributionCount = contributionMap.get(dateStr) || 0;
          fullData.push({
            date: dateStr,
            count: contributionCount
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        // Validate all dates are valid and log any issues
        let invalidDates = 0;
        let firstInvalidIndex = -1;
        fullData.forEach((item, index) => {
          const testDate = new Date(item.date);
          if (isNaN(testDate.getTime())) {
            invalidDates++;
            if (firstInvalidIndex === -1) {
              firstInvalidIndex = index;
              console.warn('First invalid date found:', item.date, 'at index', index, 'after', fullData[index - 1]?.date);
            }
          }
        });
        
        if (invalidDates > 0) {
          console.warn(`Found ${invalidDates} invalid dates out of ${fullData.length} total. First invalid at index: ${firstInvalidIndex}`);
          if (firstInvalidIndex >= 0) {
            console.log('Sample dates around invalid area:', 
              fullData.slice(Math.max(0, firstInvalidIndex - 5), firstInvalidIndex + 5));
          }
        }

        setContributions(fullData);
        
        // Calculate totals
        const total = fullData.reduce((sum, day) => sum + day.count, 0);
        setTotalContributions(total);
        
        // Calculate current streak (days with at least 1 contribution from today backwards)
        let streak = 0;
        for (let i = fullData.length - 1; i >= 0; i--) {
          if (fullData[i]?.count > 0) {
            streak++;
          } else if (streak > 0) {
            break;
          }
        }
        setCurrentStreak(streak);
      } catch (error) {
        console.error('Failed to fetch GitHub contributions:', error);
        // Fallback to empty data on error
        const today = new Date();
        const threeYearsAgo = new Date(today);
        threeYearsAgo.setFullYear(today.getFullYear() - 3);
        const fallbackData: ContributionData[] = [];
        
        const currentDate = new Date(threeYearsAgo);
        while (currentDate <= today) {
          fallbackData.push({
            date: currentDate.toISOString().split('T')[0],
            count: 0
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }
        setContributions(fallbackData);
        setTotalContributions(0);
        setCurrentStreak(0);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  // Auto-scroll to the right (most recent dates) when data loads
  useEffect(() => {
    if (!loading && contributions.length > 0 && scrollContainerRef.current) {
      // Scroll to the very right (showing most recent dates)
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
      scrollLeftRef.current = scrollContainerRef.current.scrollWidth;
    }
  }, [loading, contributions.length]);

  // Global mouse event handlers for smooth dragging (attached to document)
  const globalMouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null);
  const globalMouseUpRef = useRef<(() => void) | null>(null);

  // Mouse drag scrolling handlers - optimized for smooth performance
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.userSelect = 'none';
    scrollContainerRef.current.style.scrollBehavior = 'auto';
    scrollContainerRef.current.style.willChange = 'scroll-position';
    
    // Create and attach global listeners for smooth dragging
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !scrollContainerRef.current) return;
      e.preventDefault();
      const x = e.pageX;
      const walk = (x - startXRef.current) * 1.0; // Reduced multiplier for smoother scrolling
      scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleGlobalMouseUp = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = 'grab';
        scrollContainerRef.current.style.userSelect = 'auto';
        scrollContainerRef.current.style.scrollBehavior = 'smooth';
        scrollContainerRef.current.style.willChange = 'auto';
      }
      isDraggingRef.current = false;
      if (globalMouseMoveRef.current) {
        document.removeEventListener('mousemove', globalMouseMoveRef.current);
        globalMouseMoveRef.current = null;
      }
      if (globalMouseUpRef.current) {
        document.removeEventListener('mouseup', globalMouseUpRef.current);
        globalMouseUpRef.current = null;
      }
    };

    globalMouseMoveRef.current = handleGlobalMouseMove;
    globalMouseUpRef.current = handleGlobalMouseUp;
    
    document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Handled by global document listener for better performance
  };

  const handleMouseUp = () => {
    // Handled by global document listener
  };

  const handleMouseLeave = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.userSelect = 'auto';
      scrollContainerRef.current.style.scrollBehavior = 'smooth';
      scrollContainerRef.current.style.willChange = 'auto';
    }
    isDraggingRef.current = false;
  };

  // Disable wheel scrolling
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-emerald-950/30 border border-emerald-950/40';
    if (count <= 2) return 'bg-emerald-900/50 border border-emerald-800/50';
    if (count <= 4) return 'bg-emerald-700/60 border border-emerald-600/50';
    if (count <= 6) return 'bg-emerald-500/70 border border-emerald-400/50';
    return 'bg-emerald-400/80 border border-emerald-300/50';
  };

  // Organize contributions into weeks (7 days per week)
  // Note: Don't pad incomplete weeks - only use actual contribution data
  const weeks: ContributionData[][] = [];
  const daysPerWeek = 7;
  const totalWeeks = Math.ceil(contributions.length / daysPerWeek);
  
  for (let i = 0; i < totalWeeks; i++) {
    const weekData = contributions.slice(i * daysPerWeek, (i + 1) * daysPerWeek);
    // Only add weeks that have actual data (at least one day)
    if (weekData.length > 0) {
      weeks.push(weekData);
    }
  }

  // Debug: Log weeks data
  if (contributions.length > 0) {
    console.log('Weeks calculation:', {
      totalContributions: contributions.length,
      totalWeeks: weeks.length,
      firstWeek: weeks[0]?.length,
      lastWeek: weeks[weeks.length - 1]?.length,
      sampleWeek: weeks[0]
    });
  }

  if (loading) {
    return (
      <div className="terminal-border rounded-md p-6 md:p-8">
        <h2 className="font-mono text-xl text-emerald-400 mb-4">{t('github.activity')}</h2>
        <div className="flex items-center justify-center h-32">
          <span className="font-mono text-emerald-300">{t('github.loading')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-border rounded-md p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-xl text-emerald-400">{t('github.activity')}</h2>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-emerald-300 hover:text-emerald-400 transition-colors"
        >
          {t('github.viewProfile')}
        </a>
      </div>

      <div 
        ref={scrollContainerRef}
        className="mb-4 pb-2 cursor-grab active:cursor-grabbing select-none scrollbar-hide" 
        style={{ 
          width: '100%', 
          overflowX: 'auto',
          transform: 'translateZ(0)', // Force GPU acceleration
          WebkitTransform: 'translateZ(0)',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
      >
        <div className="flex gap-1.5 min-w-max px-2">
          {weeks.map((week, weekIdx) => {
            // Check if this week starts a new year
            const weekStartDate = week[0]?.date ? new Date(week[0].date) : null;
            const prevWeekDate = weeks[weekIdx - 1]?.[0]?.date ? new Date(weeks[weekIdx - 1][0].date) : null;
            const isNewYear = weekStartDate && prevWeekDate && weekStartDate.getFullYear() !== prevWeekDate.getFullYear();
            const yearLabel = weekStartDate ? weekStartDate.getFullYear() : '';

            return (
              <div key={weekIdx} className="flex items-start gap-1">
                {isNewYear && (
                  <div className="flex items-center h-full mr-2 pr-2 border-r border-emerald-800/40">
                    <span className="text-xs font-mono text-emerald-400 font-semibold whitespace-nowrap">{yearLabel}</span>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => {
                    // Skip empty or invalid dates
                    if (!day || !day.date || day.date.trim() === '') {
                      return <div key={`${weekIdx}-${dayIdx}`} className="w-3.5 h-3.5 flex-shrink-0" />;
                    }
                    
                    // Format date safely
                    const date = new Date(day.date);
                    const isValidDate = !isNaN(date.getTime());
                    
                    if (!isValidDate) {
                      console.warn('Invalid date in week rendering:', day.date, 'at week', weekIdx, 'day', dayIdx);
                      return <div key={`${weekIdx}-${dayIdx}`} className="w-3.5 h-3.5 flex-shrink-0 bg-red-500/20" title="Invalid date" />;
                    }
                    
                    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const contributionText = day.count === 1 ? t('github.contributions') : t('github.contributions.plural');
                    
                    return (
                      <div
                        key={`${weekIdx}-${dayIdx}`}
                        className={`w-3.5 h-3.5 rounded ${getIntensity(day.count)} hover:scale-110 hover:shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all cursor-pointer flex-shrink-0`}
                        title={`${dateStr}: ${day.count} ${contributionText}`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm font-mono">
        <div className="flex flex-wrap items-center gap-4 text-emerald-300">
          <div className="terminal-border rounded px-3 py-1.5 bg-emerald-900/20">
            <span className="text-emerald-700 mr-1">{t('github.total')}</span>
            <span className="font-semibold text-emerald-300">{totalContributions.toLocaleString()}</span>
            <span className="text-emerald-500 ml-1">{t('github.contributions.plural')}</span>
          </div>
          <div className="terminal-border rounded px-3 py-1.5 bg-emerald-900/20">
            <span className="text-emerald-700 mr-1">{t('github.streak')}</span>
            <span className="font-semibold text-emerald-300">{currentStreak}</span>
            <span className="text-emerald-500 ml-1">{t('github.days.plural')}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-emerald-400">
          <span className="text-emerald-600">{t('github.less')}</span>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded border border-emerald-950/40 bg-emerald-950/30" />
            <div className="w-2.5 h-2.5 rounded border border-emerald-900/50 bg-emerald-900/50" />
            <div className="w-2.5 h-2.5 rounded border border-emerald-700/50 bg-emerald-700/60" />
            <div className="w-2.5 h-2.5 rounded border border-emerald-500/50 bg-emerald-500/70" />
            <div className="w-2.5 h-2.5 rounded border border-emerald-400/50 bg-emerald-400/80" />
          </div>
          <span className="text-emerald-600">{t('github.more')}</span>
        </div>
      </div>
      
      {contributions.length === 0 && !loading && (
        <div className="mt-4 text-center text-emerald-500 text-xs font-mono">
          {t('github.noData')}
        </div>
      )}
    </div>
  );
}
