import { useEffect, useRef } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRefresh: () => void;
}

interface MenuItem {
  label: string;
  action?: () => void;
  separator?: boolean;
  disabled?: boolean;
}

export default function ContextMenu({ x, y, onClose, onRefresh }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const items: MenuItem[] = [
    { label: 'View', disabled: true },
    { label: 'Sort by', disabled: true },
    { label: 'Refresh', action: onRefresh },
    { separator: true } as MenuItem,
    { label: 'Paste', disabled: true },
    { separator: true } as MenuItem,
    { label: 'Personalize', disabled: true },
    { separator: true } as MenuItem,
    { label: 'Open Terminal', disabled: true },
  ];

  // Adjust position to keep menu within viewport
  const menuWidth = 180;
  const menuHeight = items.length * 32 + items.filter((i) => i.separator).length * 8;
  const adjustedX = Math.min(x, window.innerWidth - menuWidth);
  const adjustedY = Math.min(y, window.innerHeight - menuHeight);

  return (
    <div
      ref={menuRef}
      className="fixed"
      style={{
        left: adjustedX,
        top: adjustedY,
        width: menuWidth,
        background: '#ffffff',
        border: '1px solid #e0e0e0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        padding: '4px 0',
        zIndex: 1002,
        fontFamily: '"Segoe UI", sans-serif',
        userSelect: 'none',
      }}
    >
      {items.map((item, index) => {
        if (item.separator) {
          return (
            <div
              key={index}
              style={{
                height: 1,
                background: '#e5e5e5',
                margin: '4px 0',
              }}
            />
          );
        }

        return (
          <button
            key={index}
            onClick={() => {
              if (!item.disabled && item.action) {
                item.action();
                onClose();
              }
            }}
            className="w-full text-left"
            style={{
              padding: '6px 24px 6px 32px',
              fontSize: 13,
              color: item.disabled ? '#999' : '#333',
              background: 'transparent',
              border: 'none',
              cursor: item.disabled ? 'default' : 'pointer',
            }}
            onMouseEnter={(e) => {
              if (!item.disabled) {
                e.currentTarget.style.background = '#e5f3ff';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
