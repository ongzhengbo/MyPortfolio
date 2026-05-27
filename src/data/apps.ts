import type { AppConfig, Project, Certificate, VideoItem } from '@/types';

// ============================================
// CUSTOMIZE YOUR APP ICONS HERE!
// Add iconImage: '/Image/your-icon.png' to use a custom image.
// If iconImage is not set (undefined), the app will fall back to the default icon.
// ============================================

export const APPS: Record<string, AppConfig> = {
  'About Me': {
    name: 'About Me',
    icon: 'user',
    // iconImage: '/Image/AboutMeIcon.png', // Uncomment and set path to use custom icon
    color: '#0078D7',
    defaultWidth: 800,
    defaultHeight: 600,
    defaultX: 0,
    defaultY: 0,
  },
  'My Projects': {
    name: 'My Projects',
    icon: 'briefcase',
    // iconImage: '/Image/ProjectsIcon.png',
    color: '#107C10',
    defaultWidth: 900,
    defaultHeight: 650,
    defaultX: 50,
    defaultY: 30,
  },
  Certificate: {
    name: 'Certificate',
    icon: 'scroll',
    // iconImage: '/Image/CertIcon.png',
    color: '#D83B01',
    defaultWidth: 800,
    defaultHeight: 600,
    defaultX: 100,
    defaultY: 60,
  },
  'Demo Reel': {
    name: 'Demo Reel',
    icon: 'film',
    // iconImage: '/Image/DemoReelIcon.png',
    color: '#5C2D91',
    defaultWidth: 960,
    defaultHeight: 540,
    defaultX: 0,
    defaultY: 0,
  },
};

export const DESKTOP_ICONS = [
  { name: 'About Me', icon: 'user', color: '#0078D7' },
  { name: 'My Projects', icon: 'briefcase', color: '#107C10' },
  { name: 'Certificate', icon: 'scroll', color: '#D83B01' },
  { name: 'Demo Reel', icon: 'film', color: '#5C2D91' },
];

export const TASKBAR_APPS = [
  { name: 'File Explorer', icon: 'folder', color: '#0078D7' },
  { name: 'Edge', icon: 'globe', color: '#0078D7' },
  { name: 'About Me', icon: 'user', color: '#0078D7' },
  { name: 'My Projects', icon: 'briefcase', color: '#107C10' },
  { name: 'Certificate', icon: 'scroll', color: '#D83B01' },
];

export const START_TILES = [
  { name: 'About Me', icon: 'user', color: '#0078D7', size: 'normal' },
  { name: 'My Projects', icon: 'briefcase', color: '#107C10', size: 'normal' },
  { name: 'Certificate', icon: 'scroll', color: '#D83B01', size: 'normal' },
  { name: 'Demo Reel', icon: 'film', color: '#5C2D91', size: 'normal' },
  { name: 'Settings', icon: 'settings', color: '#767676', size: 'normal' },
  { name: 'Edge', icon: 'globe', color: '#0078D7', size: 'normal' },
];

export const START_APP_LIST = [
  { name: 'About Me', icon: 'user' },
  { name: 'Certificate', icon: 'scroll' },
  { name: 'Demo Reel', icon: 'film' },
  { name: 'My Projects', icon: 'briefcase' },
];

export const PROJECTS: Project[] = [
  {
    name: 'WahHotSia',
    description:
      'A social 3D room-building game where players design rooms, receive suggestions for improvements, visualize wind flow, and explore other players\' creations through a feature page.',
    whatIDid: [
      'Built a 3D room-building system for players to design and customize interior spaces.',
      'Implemented a suggestion system to help improve room layouts and placement decisions.',
      'Developed a wind flow visualization feature to show how air moves through the designed room.',
      'Created a feature page where players can browse and view other users\' room designs.',
      'Worked on gameplay systems and user experience features to support social sharing and room planning.',
    ],
    tags: ['Unity', 'C#'],
    youtubeId: '0uS9ZIcvuJA',
  },
  {
    name: 'Into the Canvas',
    description:
      'An internship couch co-op project where players use paint mechanics to solve puzzles together.',
    whatIDid: [
      'Designed and implemented a modular UI system to support reusable menus and scalable UI flows.',
      'Built a custom UnityEvent-style system with an improved Inspector that supports multiple parameters.',
      'Developed custom toon shaders for 3D models.',
      'Integrated UI animations with polish effects such as gradient backgrounds and selection feedback.',
      'Implemented player stats and timer systems, along with game and audio settings menus.',
      'Added controller-friendly UX features including auto-scrolling settings navigation.',
      'Implemented procedural mesh destruction compatible with any mesh.',
      'Prototyped obstacle mechanics and player throwing trajectory, then handed off to a teammate for final integration.',
    ],
    tags: ['Unity', 'C#', 'Internship'],
    youtubeId: 'kYTfj2U4430',
  },
  {
    name: 'Vestige',
    description:
      'A story-driven 3D side-scroller built in Unreal Engine, focusing on dream-like environments and emotional progression.',
    whatIDid: [
      'Implemented player movement including push/pull, hang, climb, and elevators.',
      'Developed advanced camera systems with dead-zones, smoothing, and dynamic FOV.',
      'Built interaction and item inspection systems.',
      'Implemented quest system and full game UI.',
      'Created saving and loading systems.',
    ],
    tags: ['Unreal Engine'],
    youtubeId: 'ULQUVjG7M-s',
  },
  {
    name: 'Echoes Of Virtue',
    description:
      'A group project based around sustainability goals of peace, justice, and strong institutions.',
    whatIDid: [
      'Implemented player controller and core gameplay systems.',
      'Built world-switching mechanics between past and future states.',
      'Developed doors that transition between scenes.',
      'Created enemies, moving platforms, and interactive elements.',
      'Designed and built multiple gameplay levels.',
    ],
    tags: ['Unity', 'C#'],
    youtubeId: '8CkgqogTGeM',
  },
  {
    name: 'Boat',
    description: 'A group project based on the open-world survival genre.',
    whatIDid: [
      'Designed and implemented the game UI.',
      'Extended the framework\'s scene manager to support multiple scenes.',
      'Enabled parallel level development for open-world gameplay.',
      'Created cutscenes and physics-based systems.',
      'Designed and built the OilRig level.',
    ],
    tags: ['C++', 'OpenGL'],
    youtubeId: 'P6keUXjFF40',
  },
];

export const CERTIFICATES: Certificate[] = [
  { name: 'AWS for Game', image: '/Cert/Cert1.png' },
  { name: 'Introduction to Python', image: '/Cert/Cert2.png' },
  { name: 'Blockchain Essentials', image: '/Cert/Cert3.png' },
  { name: 'Introduction to Cloud', image: '/Cert/Cert4.png' },
  { name: 'Data Science 101', image: '/Cert/Cert5.png' },
];

export const DEMO_REEL_PLAYLIST: VideoItem[] = [
  { title: 'WahHotSia', src: '/Videos/wahhotsia.mp4' },
  { title: 'Into the Canvas', src: '/Videos/intothecanvas.mp4' },
  { title: 'Vestige', src: '/Videos/vestige.mp4' },
];

export const SKILLS = [
  'JavaScript',
  'HTML',
  'CSS',
  'C++',
  'Java',
  'MySQL',
  'C#',
  'Unity',
  'Unreal Engine',
];
