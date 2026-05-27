import { useState, useCallback, useRef } from 'react';
import { DESKTOP_ICONS } from '@/data/apps';
import IconRenderer from '@/components/IconRenderer';
import type { WindowState } from '@/types';

interface DesktopProps {
  onOpenApp: (appName: string) => void;
  windows: WindowState[];
  onWindowActivate: (id: string) => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export default function Desktop({ onOpenApp, windows, onWindowActivate, onContextMenu }: DesktopProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickCountRef = useRef(0);

  const openApp = useCallback((name: string) => {
    const existingWindow = windows.find(w => w.appName === name);
    if (existingWindow && existingWindow.isMinimized) {
      onWindowActivate(existingWindow.id);
    }
    onOpenApp(name);
    setSelectedIcon(null);
  }, [onOpenApp, windows, onWindowActivate]);

  const handleIconClick = useCallback((name: string) => {
    clickCountRef.current += 1;

    if (clickCountRef.current === 1) {
      // First click: select the icon and start timer
      setSelectedIcon(name);
      clickTimerRef.current = setTimeout(() => {
        // Single click: just select (do nothing else)
        clickCountRef.current = 0;
      }, 250);
    } else if (clickCountRef.current === 2) {
      // Double click: open the app
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
      clickCountRef.current = 0;
      openApp(name);
    }
  }, [openApp]);

  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
    }
  }, []);

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `url('/Image/Background.jpg') center/cover no-repeat`,
        zIndex: 0,
      }}
      onClick={handleDesktopClick}
      onContextMenu={onContextMenu}
    >
      {/* Desktop Icons */}
      <div
        className="absolute flex flex-col"
        style={{
          top: 16,
          left: 8,
          gap: 4,
          zIndex: 1,
          userSelect: 'none',
        }}
      >
        {DESKTOP_ICONS.map((icon) => {
          const isSelected = selectedIcon === icon.name;
          return (
            <button
              key={icon.name}
              className="flex flex-col items-center"
              style={{
                width: 76,
                padding: '6px 4px',
                background: isSelected
                  ? 'rgba(255,255,255,0.25)'
                  : 'transparent',
                border: isSelected
                  ? '1px solid rgba(255,255,255,0.3)'
                  : '1px solid transparent',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'background 0.1s, border 0.1s',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick(icon.name);
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.border = '1px solid transparent';
                } else {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.3)';
                }
              }}
              title={icon.name}
            >
              <div style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconRenderer iconKey={icon.icon} appName={icon.name} size={40} />
              </div>
              <span
                className="text-center mt-1"
                style={{
                  fontSize: 12,
                  color: 'white',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                  lineHeight: '1.3',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {icon.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
