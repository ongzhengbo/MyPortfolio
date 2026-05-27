import {
  User,
  Briefcase,
  Scroll,
  Film,
  Folder,
  Globe,
  Settings,
  Search,
  Power,
  Layout,
  ChevronUp,
  Minus,
  Square,
  X,
  Maximize2,
  ArrowRight,
  ChevronRight,
  type LucideProps,
} from 'lucide-react';
import { APPS } from '@/data/apps';

// Map of icon names to lucide components
const lucideIconMap: Record<string, React.FC<LucideProps>> = {
  user: User,
  briefcase: Briefcase,
  scroll: Scroll,
  film: Film,
  folder: Folder,
  globe: Globe,
  settings: Settings,
  search: Search,
  power: Power,
  layout: Layout,
  'chevron-up': ChevronUp,
  minus: Minus,
  square: Square,
  x: X,
  'maximize-2': Maximize2,
  'arrow-right': ArrowRight,
  'chevron-right': ChevronRight,
};

interface IconRendererProps {
  /** The icon key from lucide (e.g. 'user', 'briefcase') */
  iconKey: string;
  /** App name to look up custom icon image */
  appName?: string;
  /** Icon size in pixels */
  size?: number;
  /** Additional styles */
  style?: React.CSSProperties;
  /** Additional className */
  className?: string;
}

/**
 * Renders an app icon. If the app has a custom iconImage configured,
 * it displays that image. Otherwise falls back to the lucide-react icon.
 *
 * To customize an app's icon, add iconImage to its config in data/apps.ts:
 *   'About Me': { name: 'About Me', icon: 'user', iconImage: '/Image/my-icon.png', ... }
 */
export default function IconRenderer({
  iconKey,
  appName,
  size = 24,
  style,
  className,
}: IconRendererProps) {
  // Check if this app has a custom icon image
  const appConfig = appName ? APPS[appName] : undefined;
  const customImage = appConfig?.iconImage;

  // If there's a custom image, render it
  if (customImage) {
    return (
      <img
        src={customImage}
        alt={appName || iconKey}
        width={size}
        height={size}
        style={{
          objectFit: 'contain',
          pointerEvents: 'none',
          ...style,
        }}
        className={className}
        draggable={false}
        onError={(e) => {
          // If image fails to load, hide it so the parent can show fallback
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    );
  }

  // Fall back to lucide icon
  const IconComponent = lucideIconMap[iconKey];
  if (!IconComponent) {
    // Final fallback: return a simple div
    return (
      <div
        style={{ width: size, height: size, ...style }}
        className={className}
      />
    );
  }

  return <IconComponent size={size} style={style} className={className} />;
}

/**
 * Get just the icon image path for an app (or undefined if none)
 */
export function getAppIconImage(appName: string): string | undefined {
  return APPS[appName]?.iconImage;
}
