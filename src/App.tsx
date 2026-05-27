import { useState, useCallback, useEffect, useRef } from 'react';
import type { WindowState } from '@/types';
import { APPS } from '@/data/apps';
import LoginScreen from '@/components/LoginScreen';
import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';
import StartMenu from '@/components/StartMenu';
import AppWindow from '@/components/AppWindow';
import AboutMeApp from '@/components/AboutMeApp';
import ProjectsApp from '@/components/ProjectsApp';
import CertificateApp from '@/components/CertificateApp';
import DemoReelApp from '@/components/DemoReelApp';
import ContextMenu from '@/components/ContextMenu';

type Screen = 'login' | 'desktop';

function getAppContent(appName: string) {
  switch (appName) {
    case 'About Me':
      return <AboutMeApp />;
    case 'My Projects':
      return <ProjectsApp />;
    case 'Certificate':
      return <CertificateApp />;
    case 'Demo Reel':
      return <DemoReelApp />;
    default:
      return <div style={{ padding: 20 }}>Content not available</div>;
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Open a new window
  const openWindow = useCallback(
    (appName: string) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.appName === appName && !w.isMinimized);
        if (existing) {
          // Bring to front
          setActiveWindowId(existing.id);
          setNextZIndex((z) => z + 1);
          return prev.map((w) =>
            w.id === existing.id ? { ...w, zIndex: nextZIndex } : w
          );
        }

        const minimized = prev.find((w) => w.appName === appName && w.isMinimized);
        if (minimized) {
          setActiveWindowId(minimized.id);
          setNextZIndex((z) => z + 1);
          return prev.map((w) =>
            w.id === minimized.id
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          );
        }

        const config = APPS[appName];
        if (!config) return prev;

        // Center window on screen
        const x =
          config.defaultX ||
          Math.max(0, Math.floor((window.innerWidth - config.defaultWidth) / 2));
        const y =
          config.defaultY ||
          Math.max(0, Math.floor((window.innerHeight - 40 - config.defaultHeight) / 2));

        const newWindow: WindowState = {
          id: `window-${appName.replace(/\s+/g, '-')}-${Date.now()}`,
          appName,
          x,
          y,
          width: config.defaultWidth,
          height: config.defaultHeight,
          isMaximized: false,
          isMinimized: false,
          zIndex: nextZIndex,
        };

        setActiveWindowId(newWindow.id);
        setNextZIndex((z) => z + 1);
        return [...prev, newWindow];
      });
    },
    [nextZIndex]
  );

  // Close window
  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const filtered = prev.filter((w) => w.id !== id);
      if (filtered.length > 0) {
        const topWindow = filtered.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
        setActiveWindowId(topWindow.id);
      } else {
        setActiveWindowId(null);
      }
      return filtered;
    });
  }, []);

  // Minimize window
  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const updated = prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w));
      // Find the next active window
      const visible = updated.filter((w) => !w.isMinimized);
      if (visible.length > 0) {
        const topWindow = visible.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
        setActiveWindowId(topWindow.id);
      } else {
        setActiveWindowId(null);
      }
      return updated;
    });
  }, []);

  // Maximize/Restore window
  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        return { ...w, isMaximized: !w.isMaximized };
      })
    );
  }, []);

  // Activate window (bring to front)
  const activateWindow = useCallback(
    (id: string) => {
      setActiveWindowId(id);
      setNextZIndex((z) => z + 1);
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id === id) {
            return { ...w, zIndex: nextZIndex, isMinimized: false };
          }
          return w;
        })
      );
    },
    [nextZIndex]
  );

  // Update window position
  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  // Update window size
  const updateWindowSize = useCallback(
    (id: string, width: number, height: number) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, width, height } : w))
      );
    },
    []
  );

  // Show desktop (minimize all)
  const showDesktop = useCallback(() => {
    setWindows((prev) =>
      prev.map((w) => ({ ...w, isMinimized: true }))
    );
    setActiveWindowId(null);
  }, []);

  // Handle context menu
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  // Close context menu
  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Handle login
  const handleLogin = useCallback(() => {
    setScreen('desktop');
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen !== 'desktop') return;

      // D key opens Demo Reel
      if (e.key.toLowerCase() === 'd') {
        openWindow('Demo Reel');
        // Maximize it
        setWindows((prev) => {
          const demoWindow = prev.find((w) => w.appName === 'Demo Reel');
          if (demoWindow) {
            return prev.map((w) =>
              w.id === demoWindow.id ? { ...w, isMaximized: true } : w
            );
          }
          return prev;
        });
      }

      // Escape closes active window
      if (e.key === 'Escape') {
        if (startMenuOpen) {
          setStartMenuOpen(false);
          return;
        }
        if (contextMenu) {
          setContextMenu(null);
          return;
        }
        if (activeWindowId) {
          closeWindow(activeWindowId);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [screen, activeWindowId, closeWindow, openWindow, startMenuOpen, contextMenu]);

  return (
    <div
      ref={desktopRef}
      className="fixed inset-0 overflow-hidden"
      style={{
        fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Login Screen */}
      {screen === 'login' && <LoginScreen onLogin={handleLogin} />}

      {/* Desktop */}
      {screen === 'desktop' && (
        <>
          <Desktop
            onOpenApp={openWindow}
            windows={windows}
            onWindowActivate={activateWindow}
            onContextMenu={handleContextMenu}
          />

          {/* Window Container */}
          <div
            className="absolute inset-0"
            style={{ zIndex: 10, bottom: 40 }}
          >
            {windows.map(
              (win) =>
                !win.isMinimized && (
                  <AppWindow
                    key={win.id}
                    window={win}
                    isActive={win.id === activeWindowId}
                    onActivate={activateWindow}
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    onMaximize={maximizeWindow}
                    onUpdatePosition={updateWindowPosition}
                    onUpdateSize={updateWindowSize}
                  >
                    {getAppContent(win.appName)}
                  </AppWindow>
                )
            )}
          </div>

          {/* Taskbar */}
          <Taskbar
            windows={windows}
            activeWindowId={activeWindowId}
            onToggleStart={() => setStartMenuOpen((v) => !v)}
            onWindowActivate={activateWindow}
            onWindowMinimizeToggle={(id) => {
              const win = windows.find((w) => w.id === id);
              if (win) {
                if (win.isMinimized) {
                  activateWindow(id);
                } else if (win.id === activeWindowId) {
                  minimizeWindow(id);
                } else {
                  activateWindow(id);
                }
              }
            }}
            onOpenApp={openWindow}
            onShowDesktop={showDesktop}
          />

          {/* Start Menu */}
          <StartMenu
            isOpen={startMenuOpen}
            onClose={() => setStartMenuOpen(false)}
            onOpenApp={openWindow}
          />

          {/* Context Menu */}
          {contextMenu && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              onClose={closeContextMenu}
              onRefresh={() => window.location.reload()}
            />
          )}
        </>
      )}
    </div>
  );
}
