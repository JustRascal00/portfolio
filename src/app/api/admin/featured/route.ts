import { NextRequest, NextResponse } from 'next/server';
import { PROJECTS_DATA } from '@/app/data/projects';
import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'featured-config.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// GET current featured project
export async function GET() {
  try {
    ensureDataDir();
    
    let featuredId = 'chatai'; // default
    
    if (fs.existsSync(CONFIG_PATH)) {
      const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
      featuredId = config.featuredProjectId || 'chatai';
    }
    
    const featuredProject = PROJECTS_DATA.find(p => p.id === featuredId);
    
    return NextResponse.json({ 
      success: true, 
      featuredProjectId: featuredId,
      featuredProject: featuredProject || null
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
    
    // Check password
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (password !== adminPassword) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 });
    }
    
    // Validate project ID
    const project = PROJECTS_DATA.find(p => p.id === featuredProjectId);
    if (!project) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid project ID' 
      }, { status: 400 });
    }
    
    // Save to config file
    ensureDataDir();
    const config = {
      featuredProjectId,
      updatedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    
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

