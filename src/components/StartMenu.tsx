import { useEffect, useRef } from 'react';
import {
  Search,
  Power,
  User,
} from 'lucide-react';
import { START_TILES, START_APP_LIST } from '@/data/apps';
import IconRenderer from '@/components/IconRenderer';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appName: string) => void;
}

export default function StartMenu({ isOpen, onClose, onOpenApp }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAppClick = (appName: string) => {
    onOpenApp(appName);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="fixed flex flex-col"
      style={{
        bottom: 40,
        left: 0,
        width: 480,
        height: 480,
        background: 'rgba(30, 30, 30, 0.95)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.4)',
        zIndex: 1001,
        userSelect: 'none',
      }}
    >
      {/* Top Search Bar */}
      <div
        className="flex items-center"
        style={{
          height: 40,
          padding: '0 16px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Search size={14} style={{ color: 'rgba(255,255,255,0.5)', marginRight: 8 }} />
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
          Type here to search
        </span>
      </div>

      {/* Pinned Tiles */}
      <div
        style={{
          padding: '12px 16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 4,
        }}
      >
        {START_TILES.map((tile) => (
          <button
            key={tile.name}
            onClick={() => handleAppClick(tile.name)}
            className="flex flex-col items-start justify-end relative transition-all"
            style={{
              height: 96,
              padding: '8px 10px',
              background: tile.color,
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'brightness(1)';
            }}
          >
            <div style={{ color: 'white', position: 'absolute', top: 8, left: 10 }}>
              <IconRenderer iconKey={tile.icon} appName={tile.name} size={24} />
            </div>
            <span
              style={{
                color: 'white',
                fontSize: 11,
                fontWeight: 500,
                marginTop: 'auto',
              }}
            >
              {tile.name}
            </span>
          </button>
        ))}
      </div>

      {/* App List */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '4px 0' }}>
        <div
          style={{
            padding: '4px 16px',
            fontSize: 11,
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          A
        </div>
        {START_APP_LIST.map((app) => (
          <button
            key={app.name}
            onClick={() => handleAppClick(app.name)}
            className="flex items-center w-full transition-colors"
            style={{
              height: 36,
              padding: '0 16px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'transparent')
            }
          >
            <span style={{ marginRight: 12, display: 'flex', alignItems: 'center' }}>
              <IconRenderer iconKey={app.icon} appName={app.name} size={18} />
            </span>
            <span style={{ fontSize: 13 }}>{app.name}</span>
          </button>
        ))}
      </div>

      {/* Bottom Bar */}
      <div
        className="flex items-center justify-between"
        style={{
          height: 48,
          padding: '0 16px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center">
          {/* User icon instead of profile photo */}
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 32,
              height: 32,
              marginRight: 10,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <User size={16} color="white" />
          </div>
          <span style={{ fontSize: 13, color: 'white' }}>Zheng Bo</span>
        </div>
        <button
          className="flex items-center justify-center transition-colors"
          style={{
            width: 32,
            height: 32,
            color: 'white',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = 'transparent')
          }
        >
          <Power size={16} />
        </button>
      </div>
    </div>
  );
}
