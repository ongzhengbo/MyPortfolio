import { useRef, useState, useCallback, useEffect } from 'react';
import {
  Minus,
  Square,
  X,
  Maximize2,
} from 'lucide-react';
import { APPS } from '@/data/apps';
import IconRenderer from '@/components/IconRenderer';
import type { WindowState } from '@/types';

interface AppWindowProps {
  window: WindowState;
  isActive: boolean;
  children: React.ReactNode;
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onUpdatePosition: (id: string, x: number, y: number) => void;
  onUpdateSize: (id: string, width: number, height: number) => void;
}

type ResizeDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null;

export default function AppWindow({
  window: win,
  isActive,
  children,
  onActivate,
  onClose,
  onMinimize,
  onMaximize,
  onUpdatePosition,
  onUpdateSize,
}: AppWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDir, setResizeDir] = useState<ResizeDir>(null);
  const [closing, setClosing] = useState(false);
  const [opening, setOpening] = useState(true);
  const dragStart = useRef({ x: 0, y: 0, winX: 0, winY: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, winX: 0, winY: 0 });

  const appConfig = APPS[win.appName];

  // Opening animation
  useEffect(() => {
    const timer = setTimeout(() => setOpening(false), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = useCallback(() => {
    if (!isActive) {
      onActivate(win.id);
    }
  }, [isActive, onActivate, win.id]);

  // Dragging
  const handleTitleBarMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (win.isMaximized) return;
      if ((e.target as HTMLElement).closest('.window-control')) return;

      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        winX: win.x,
        winY: win.y,
      };
      e.preventDefault();
    },
    [win.isMaximized, win.x, win.y]
  );

  // Resizing
  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent, dir: ResizeDir) => {
      if (win.isMaximized) return;
      setIsResizing(true);
      setResizeDir(dir);
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        width: win.width,
        height: win.height,
        winX: win.x,
        winY: win.y,
      };
      e.preventDefault();
      e.stopPropagation();
    },
    [win.isMaximized, win.width, win.height, win.x, win.y]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        const newX = Math.max(
          0,
          Math.min(window.innerWidth - win.width, dragStart.current.winX + dx)
        );
        const newY = Math.max(
          0,
          Math.min(window.innerHeight - 40 - win.height, dragStart.current.winY + dy)
        );
        onUpdatePosition(win.id, newX, newY);
      }

      if (isResizing && resizeDir) {
        const dx = e.clientX - resizeStart.current.x;
        const dy = e.clientY - resizeStart.current.y;
        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;
        let newX = resizeStart.current.winX;
        let newY = resizeStart.current.winY;

        if (resizeDir.includes('e')) newWidth = Math.max(300, resizeStart.current.width + dx);
        if (resizeDir.includes('s')) newHeight = Math.max(200, resizeStart.current.height + dy);
        if (resizeDir.includes('w')) {
          const proposedWidth = resizeStart.current.width - dx;
          if (proposedWidth >= 300) {
            newWidth = proposedWidth;
            newX = resizeStart.current.winX + dx;
          }
        }
        if (resizeDir.includes('n')) {
          const proposedHeight = resizeStart.current.height - dy;
          if (proposedHeight >= 200) {
            newHeight = proposedHeight;
            newY = resizeStart.current.winY + dy;
          }
        }

        onUpdateSize(win.id, newWidth, newHeight);
        if (resizeDir.includes('w') || resizeDir.includes('n')) {
          onUpdatePosition(win.id, newX, newY);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDir(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, resizeDir, win.id, onUpdatePosition, onUpdateSize]);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => onClose(win.id), 100);
  }, [onClose, win.id]);

  const handleMinimize = useCallback(() => {
    onMinimize(win.id);
  }, [onMinimize, win.id]);

  const handleMaximize = useCallback(() => {
    onMaximize(win.id);
  }, [onMaximize, win.id]);

  const handleDoubleClickTitle = useCallback(() => {
    onMaximize(win.id);
  }, [onMaximize, win.id]);

  if (win.isMinimized) return null;

  const style: React.CSSProperties = win.isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 40,
        width: '100%',
        height: 'calc(100vh - 40px)',
        zIndex: win.zIndex,
        transform: closing ? 'scale(0.9)' : opening ? 'scale(0.8)' : 'scale(1)',
        opacity: closing ? 0 : opening ? 0 : 1,
        transition: 'transform 150ms ease-out, opacity 150ms ease-out',
      }
    : {
        position: 'absolute',
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
        transform: closing
          ? 'scale(0.9)'
          : opening
            ? 'scale(0.95)'
            : 'scale(1)',
        opacity: closing ? 0 : opening ? 0 : 1,
        transition: isDragging || isResizing ? 'none' : 'transform 150ms ease-out, opacity 150ms ease-out',
      };

  return (
    <div
      ref={windowRef}
      className="flex flex-col"
      style={{
        ...style,
        background: '#ffffff',
        border: isActive ? '1px solid #c4c4c4' : '1px solid #d0d0d0',
        boxShadow: isActive
          ? '0 4px 16px rgba(0,0,0,0.15)'
          : '0 2px 8px rgba(0,0,0,0.08)',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Title Bar */}
      <div
        className="flex items-center flex-shrink-0 select-none"
        style={{
          height: 30,
          background: isActive ? '#ffffff' : '#f0f0f0',
          borderBottom: '1px solid #e5e5e5',
          padding: '0 0 0 8px',
          cursor: win.isMaximized ? 'default' : isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleTitleBarMouseDown}
        onDoubleClick={handleDoubleClickTitle}
      >
        {/* App Icon - uses IconRenderer for custom image support */}
        <div style={{ color: isActive ? '#333' : '#999', display: 'flex', alignItems: 'center' }}>
          {appConfig && (
            <IconRenderer
              iconKey={appConfig.icon}
              appName={win.appName}
              size={16}
            />
          )}
        </div>

        {/* Title */}
        <div
          className="flex-1"
          style={{
            marginLeft: 6,
            fontSize: 12,
            color: isActive ? '#000000' : '#999999',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {win.appName} — Portfolio
        </div>

        {/* Window Controls */}
        <div className="flex window-control">
          <button
            onClick={handleMinimize}
            className="flex items-center justify-center transition-colors"
            style={{
              width: 45,
              height: 29,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(0,0,0,0.7)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = '#e5e5e5')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'transparent')
            }
          >
            <Minus size={12} />
          </button>
          <button
            onClick={handleMaximize}
            className="flex items-center justify-center transition-colors"
            style={{
              width: 45,
              height: 29,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(0,0,0,0.7)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = '#e5e5e5')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'transparent')
            }
          >
            {win.isMaximized ? <Maximize2 size={10} /> : <Square size={10} />}
          </button>
          <button
            onClick={handleClose}
            className="flex items-center justify-center transition-colors"
            style={{
              width: 45,
              height: 29,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(0,0,0,0.7)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e81123';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'rgba(0,0,0,0.7)';
            }}
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto" style={{ background: '#ffffff' }}>
        {children}
      </div>

      {/* Resize Handles */}
      {!win.isMaximized && (
        <>
          <div
            style={{ position: 'absolute', top: 0, left: 8, right: 8, height: 4, cursor: 'ns-resize' }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'n')}
          />
          <div
            style={{ position: 'absolute', bottom: 0, left: 8, right: 8, height: 4, cursor: 'ns-resize' }}
            onMouseDown={(e) => handleResizeMouseDown(e, 's')}
          />
          <div
            style={{ position: 'absolute', top: 8, left: 0, bottom: 8, width: 4, cursor: 'ew-resize' }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'w')}
          />
          <div
            style={{ position: 'absolute', top: 8, right: 0, bottom: 8, width: 4, cursor: 'ew-resize' }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
          />
          <div
            style={{ position: 'absolute', top: 0, left: 0, width: 8, height: 8, cursor: 'nw-resize' }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}
          />
          <div
            style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, cursor: 'ne-resize' }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}
          />
          <div
            style={{ position: 'absolute', bottom: 0, left: 0, width: 8, height: 8, cursor: 'sw-resize' }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
          />
          <div
            style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, cursor: 'se-resize' }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
          />
        </>
      )}
    </div>
  );
}
