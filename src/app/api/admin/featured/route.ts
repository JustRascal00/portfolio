import { NextRequest, NextResponse } from 'next/server';
import { PROJECTS_DATA } from '@/app/data/projects';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const FEATURED_KEY = 'featured_project_id';
const DEFAULT_FEATURED_ID = 'chatai';

// GET current featured project
export async function GET() {
  try {
    const featuredId = (await redis.get<string>(FEATURED_KEY)) || DEFAULT_FEATURED_ID;
    const featuredProject = PROJECTS_DATA.find(p => p.id === featuredId) || null;

    return NextResponse.json({
      success: true,
      featuredProjectId: featuredId,
      featuredProject
    });
  } catch (error) {
    console.error('Error getting featured project:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get featured project'
    }, { status: 500 });
  }
}

// POST to update featured project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { featuredProjectId, password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (password !== adminPassword) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const isValid = PROJECTS_DATA.some(p => p.id === featuredProjectId);
    if (!isValid) {
      return NextResponse.json({
        success: false,
        error: 'Invalid project ID'
      }, { status: 400 });
    }

    await redis.set(FEATURED_KEY, featuredProjectId);

    return NextResponse.json({
      success: true,
      featuredProjectId,
      message: 'Featured project updated successfully'
    });
  } catch (error) {
    console.error('Error updating featured project:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update featured project'
    }, { status: 500 });
  }
}

