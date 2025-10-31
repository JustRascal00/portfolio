export interface Project {
  id: string;
  titleKey: string;
  categoryKey: string;
  descriptionKey: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  isNew: boolean;
  tags?: string[]; // Optional tags for featured display
  bulletPoints?: string[]; // Optional bullet points for featured display
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'chatapp',
    titleKey: 'projects.chatApp1.title',
    categoryKey: 'projects.tags.chat',
    descriptionKey: 'projects.chatApp1.description',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'Pusher'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JustRascal00/chatapp',
    image: '/projects/Website1.png',
    isNew: false
  },
  {
    id: 'chatroom',
    titleKey: 'projects.chatRoom.title',
    categoryKey: 'projects.tags.chat',
    descriptionKey: 'projects.chatRoom.description',
    techStack: ['PHP', 'SQL', 'JavaScript', 'CSS'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JustRascal00/chatroom',
    image: '/projects/Website2.png',
    isNew: false
  },
  {
    id: 'rasapp',
    titleKey: 'projects.whatsappClone.title',
    categoryKey: 'projects.tags.chat',
    descriptionKey: 'projects.whatsappClone.description',
    techStack: ['Next.js', 'Socket.io', 'Tailwind CSS', 'Node.js', 'Firebase'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JustRascal00/rasapp',
    image: '/projects/Website3.png',
    isNew: false
  },
  {
    id: 'laravel-project-management',
    titleKey: 'projects.projectManagement.title',
    categoryKey: 'projects.tags.management',
    descriptionKey: 'projects.projectManagement.description',
    techStack: ['Laravel', 'React', 'Inertia.js'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JustRascal00/laravel-ProjectManagement-App',
    image: '/projects/Website4.png',
    isNew: false
  },
  {
    id: 'chatai',
    titleKey: 'projects.title', // This is the featured project (Chat Application with AI)
    categoryKey: 'projects.tags.ai',
    descriptionKey: 'projects.summary',
    techStack: ['React', 'Express', 'MongoDB', 'Google Gemini AI'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JustRascal00/CHATAI',
    image: '/projects/Website5.png',
    isNew: false,
    tags: ['projects.tags.ai', 'projects.tags.realtime', 'projects.tags.chat', 'projects.tags.fullstack'],
    bulletPoints: ['projects.bullet.ai', 'projects.bullet.realtime', 'projects.bullet.responsive']
  },
  {
    id: 'cv-website',
    titleKey: 'projects.portfolio3d.title',
    categoryKey: 'projects.tags.portfolio',
    descriptionKey: 'projects.portfolio3d.description',
    techStack: ['Three.js', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JustRascal00/Cv-Website',
    image: '/projects/Website6.png',
    isNew: false
  },
  {
    id: 'webexplain',
    titleKey: 'projects.webExplain.title',
    categoryKey: 'projects.tags.ai',
    descriptionKey: 'projects.webExplain.description',
    techStack: ['Next.js', 'TypeScript', 'Redis/Upstash', 'NextUI', 'Tailwind CSS', 'LlamaIndex/RAG', 'Lucide Icons'],
    liveUrl: 'https://webexplain.vercel.app',
    githubUrl: 'https://github.com/JustRascal00/webexplain',
    image: '/projects/Website7.png',
    isNew: true
  },
  {
    id: 'emotion-detection',
    titleKey: 'projects.emotionDetection.title',
    categoryKey: 'projects.tags.ai',
    descriptionKey: 'projects.emotionDetection.description',
    techStack: ['React.js', 'Next.js', 'FastAPI', 'Python', 'DeepFace', 'YouTube API'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JustRascal00/emotion-detection-ai',
    image: '/projects/Website8.png',
    isNew: true
  }
];

// ========================================
// TO CHANGE THE FEATURED PROJECT:
// ========================================
// Simply change the ID below to any project ID from the PROJECTS_DATA array above
// Available IDs: 'chatapp', 'chatroom', 'rasapp', 'laravel-project-management', 
//                'chatai', 'cv-website', 'webexplain', 'emotion-detection'
//
// Note: Make sure the project you want to feature has 'tags' and 'bulletPoints' 
// properties defined, or add them to support the featured display format.
// ========================================
export const FEATURED_PROJECT_ID = 'chatai';
