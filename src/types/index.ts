export interface WindowState {
  id: string;
  appName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
}

export interface AppConfig {
  name: string;
  icon: string;
  iconImage?: string; // Optional custom icon image path
  color: string;
  defaultWidth: number;
  defaultHeight: number;
  defaultX: number;
  defaultY: number;
}

export interface Project {
  name: string;
  description: string;
  whatIDid: string[];
  tags: string[];
  youtubeId: string;
}

export interface Certificate {
  name: string;
  image: string;
}

export interface VideoItem {
  title: string;
  src: string;
}
