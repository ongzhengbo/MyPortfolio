import { useState, useEffect } from 'react';
import {
  Search,
  Layout,
  ChevronUp,
} from 'lucide-react';
import { TASKBAR_APPS } from '@/data/apps';
import IconRenderer from '@/components/IconRenderer';
import type { WindowState } from '@/types';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  onToggleStart: () => void;
  onWindowActivate: (id: string) => void;
  onWindowMinimizeToggle: (id: string) => void;
  onOpenApp: (appName: string) => void;
  onShowDesktop: () => void;
}

export default function Taskbar({
  windows,
  activeWindowId,
  onToggleStart,
  onWindowActivate,
  onWindowMinimizeToggle,
  onOpenApp,
  onShowDesktop,
}: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) => {
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const formatDate = (d: Date) => {
    const mo = (d.getMonth() + 1).toString().padStart(2, '0');
    const da = d.getDate().toString().padStart(2, '0');
    const y = d.getFullYear();
    return `${mo}/${da}/${y}`;
  };

  const isAppActive = (appName: string) => {
    const w = windows.find((w) => w.appName === appName && !w.isMinimized);
    return w ? w.id === activeWindowId : false;
  };

  const isAppOpen = (appName: string) => {
    return windows.some((w) => w.appName === appName && !w.isMinimized);
  };

  const handleAppClick = (appName: string) => {
    const w = windows.find((win) => win.appName === appName);
    if (w) {
      if (w.isMinimized) {
        onWindowActivate(w.id);
      } else if (w.id === activeWindowId) {
        onWindowMinimizeToggle(w.id);
      } else {
        onWindowActivate(w.id);
      }
    } else {
      onOpenApp(appName);
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center"
      style={{
        height: 40,
        background: 'rgba(25, 25, 25, 0.88)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        zIndex: 1000,
        userSelect: 'none',
      }}
    >
      {/* Left Section - Start, Search, Task View */}
      <div className="flex items-center" style={{ padding: '0 4px' }}>
        {/* Start Button */}
        <button
          onClick={onToggleStart}
          className="flex items-center justify-center transition-colors"
          style={{
            width: 40,
            height: 40,
            color: 'white',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = 'transparent')
          }
          title="Start"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
            <rect x="1" y="1" width="8" height="8" />
            <rect x="11" y="1" width="8" height="8" />
            <rect x="1" y="11" width="8" height="8" />
            <rect x="11" y="11" width="8" height="8" />
          </svg>
        </button>

        {/* Search */}
        <button
          className="flex items-center justify-center transition-colors"
          style={{
            width: 40,
            height: 40,
            color: 'white',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = 'transparent')
          }
          title="Search"
        >
          <Search size={18} />
        </button>

        {/* Task View */}
        <button
          className="flex items-center justify-center transition-colors"
          style={{
            width: 40,
            height: 40,
            color: 'white',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = 'transparent')
          }
          title="Task View"
        >
          <Layout size={18} />
        </button>
      </div>

      {/* Center Section - Pinned Apps */}
      <div className="flex items-center justify-center flex-1" style={{ gap: 2 }}>
        {TASKBAR_APPS.map((app) => {
          const active = isAppActive(app.name);
          const open = isAppOpen(app.name);
          return (
            <button
              key={app.name}
              onClick={() => handleAppClick(app.name)}
              className="flex items-center justify-center relative transition-colors"
              style={{
                width: 48,
                height: 40,
                color: 'white',
                background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
              title={app.name}
            >
              <IconRenderer iconKey={app.icon} appName={app.name} size={20} />
              {/* Active indicator */}
              {(active || open) && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  style={{
                    width: active ? 16 : 6,
                    height: 2,
                    background: active ? '#0078D7' : 'rgba(255,255,255,0.5)',
                    borderRadius: 1,
                    transition: 'width 0.2s',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Section - System Tray & Clock */}
      <div className="flex items-center" style={{ padding: '0 4px' }}>
        {/* Chevron up for hidden icons */}
        <button
          className="flex items-center justify-center transition-colors"
          style={{
            width: 24,
            height: 40,
            color: 'rgba(255,255,255,0.7)',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = 'transparent')
          }
        >
          <ChevronUp size={12} />
        </button>

        {/* Clock */}
        <div
          className="flex flex-col items-end justify-center cursor-pointer transition-colors"
          style={{
            height: 40,
            padding: '0 8px',
            color: 'white',
            minWidth: 60,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = 'transparent')
          }
        >
          <span style={{ fontSize: 12, lineHeight: '14px' }}>
            {formatTime(time)}
          </span>
          <span style={{ fontSize: 11, lineHeight: '13px', color: 'rgba(255,255,255,0.8)' }}>
            {formatDate(time)}
          </span>
        </div>

        {/* Show Desktop Button */}
        <button
          onClick={onShowDesktop}
          className="transition-colors"
          style={{
            width: 8,
            height: 40,
            marginLeft: 4,
            background: 'transparent',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = 'transparent')
          }
          title="Show Desktop"
        />
      </div>
    </div>
  );
}
