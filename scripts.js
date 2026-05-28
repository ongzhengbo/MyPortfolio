window.PortfolioApps = window.PortfolioApps || {};

class DesktopApp {
  constructor() {
    this.openWindows = new Map();
    this.draggedWindow = null;
    this.dragOffset = { x: 0, y: 0 };
    this.resizedWindow = null;
    this.resizeDir = null;
    this.resizeStart = { x: 0, y: 0, w: 0, h: 0, l: 0, t: 0 };
    this.topZIndex = 100;
    this.isStartMenuOpen = false;

    this.appIcons = {
      'About Me': 'assets/icons/about-me.png',
      'My Projects': 'assets/icons/my-projects.png',
      'Certificate': 'assets/icons/certificate.png',
      'Demo Reel': 'assets/icons/demo-reel.png'
    };

    // Per-app default sizes (width, height) - fully customizable
    this.appSizes = {
      'About Me': { width: 600, height: 520, minWidth: 400, minHeight: 350 },
      'My Projects': { width: 820, height: 620, minWidth: 500, minHeight: 400 },
      'Certificate': { width: 700, height: 580, minWidth: 450, minHeight: 380 },
      'Demo Reel': { width: 900, height: 560, minWidth: 560, minHeight: 380 }
    };

    // Per-window decoration config: image, position, scale
    // Format: { image: 'path', top: 'px/%', right: 'px/%', width: 'px', height: 'px', opacity: 0-1 }
    this.windowDecor = {
      'About Me':       { image: 'assets/decor/tigerIcon1.png',    top: '-160px',  right: '370px',  width: '200px', height: '200px', opacity: 1 },
      'My Projects':    { image: 'assets/decor/tigerIcon2.png', top: '-100px',  right: '500px', width: '200px', height: '200px', opacity: 1 },
      'Certificate':    { image: 'assets/decor/tigerIcon4.png',     top: '-120px',  right: '250px',  width: '200px',  height: '200px',  opacity: 1 },
      'Demo Reel':      { image: 'assets/decor/tigerIcon3.png',     top: '-115px',  right: '110px', width: '150px', height: '150px', opacity: 1 }
    };

    this.resizedWindow = null;
    this.resizeDirection = null;
    this.resizeStart = { x: 0, y: 0, width: 0, height: 0, left: 0, top: 0 };

    this.initializeLogin();
    this.initializeDesktopIcons();
    this.initializeTaskbar();
    this.initializeStartMenu();
    this.initializePinnedApps();
    this.updateClock();
  }

  // ==================== LOGIN ====================
  initializeLogin() {
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('password');

    const attemptLogin = () => {
      if (passwordInput.value === '123') {
        this.enterDesktop();
      } else {
        this.shakeElement(document.querySelector('.login-panel'));
        passwordInput.value = '';
        passwordInput.placeholder = 'Wrong password';
        setTimeout(() => {
          passwordInput.placeholder = 'Enter Password';
        }, 1500);
      }
    };

    loginBtn.addEventListener('click', attemptLogin);
    passwordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') attemptLogin();
    });
  }

  shakeElement(element) {
    element.style.animation = 'none';
    element.offsetHeight;
    element.style.animation = 'shake 0.5s ease';
  }

  enterDesktop() {
    const loginScreen = document.getElementById('login-screen');
    loginScreen.style.transition = 'opacity 0.5s ease';
    loginScreen.style.opacity = '0';
    setTimeout(() => {
      loginScreen.style.display = 'none';
      document.getElementById('desktop').style.display = 'block';
    }, 500);
  }

  // ==================== DESKTOP ICONS ====================
  initializeDesktopIcons() {
    const icons = document.querySelectorAll('.desktop-icon');
    icons.forEach(icon => {
      icon.addEventListener('click', () => {
        icons.forEach(i => i.classList.remove('selected'));
        icon.classList.add('selected');
        const appName = icon.dataset.app;
        this.openWindow(appName);
      });

      icon.addEventListener('dblclick', () => {
        const appName = icon.dataset.app;
        this.openWindow(appName);
      });
    });

    document.getElementById('desktop').addEventListener('click', (e) => {
      if (e.target.id === 'desktop' || e.target.id === 'windows-container') {
        icons.forEach(i => i.classList.remove('selected'));
      }
    });
  }

  // ==================== TASKBAR ====================
  initializeTaskbar() {
    document.getElementById('start-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleStartMenu();
    });

    document.getElementById('shutdown-btn').addEventListener('click', () => {
      location.reload();
    });

    document.addEventListener('click', (e) => {
      if (this.isStartMenuOpen && !e.target.closest('#start-menu') && !e.target.closest('#start-btn')) {
        this.closeStartMenu();
      }
    });
  }

  // ==================== PINNED APPS ====================
  initializePinnedApps() {
    document.querySelectorAll('.taskbar-pin').forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const appName = pin.dataset.app;
        if (appName) this.openWindow(appName);
      });
    });
  }

  toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    this.isStartMenuOpen = !this.isStartMenuOpen;
    menu.style.display = this.isStartMenuOpen ? 'block' : 'none';
  }

  closeStartMenu() {
    this.isStartMenuOpen = false;
    document.getElementById('start-menu').style.display = 'none';
  }

  updateClock() {
    const update = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const year = now.getFullYear();

      document.getElementById('clock').textContent = `${hours}:${minutes}`;
      document.getElementById('date').textContent = `${month}/${day}/${year}`;
    };
    update();
    setInterval(update, 1000);
  }

  // ==================== START MENU ====================
  initializeStartMenu() {
    document.querySelectorAll('.start-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const appName = item.dataset.app;
        this.openWindow(appName);
        this.closeStartMenu();
      });
    });
  }

  // ==================== WINDOW MANAGEMENT ====================
openWindow(appName) {
  if (this.openWindows.has(appName)) {
    const existing = this.openWindows.get(appName);
    this.bringToFront(existing);
    this.highlightTaskbarApp(appName);
    return;
  }

  const windowEl = document.createElement('div');
  windowEl.className = 'window';
  windowEl.dataset.app = appName;
  windowEl.id = `window-${appName.replace(/\s+/g, '-')}`;

  const iconPath = this.appIcons[appName] || 'assets/icons/about-me.png';

  windowEl.innerHTML = `
    <div class="window-decor"></div>
    <div class="window-header">
      <img src="${iconPath}" class="window-icon" alt="" onerror="this.style.display='none'">
      <div class="window-title">${appName}</div>
      <div class="window-controls">
        <button class="window-control window-minimize" title="Minimize">−</button>
        <button class="window-control window-maximize" title="Maximize">□</button>
        <button class="window-control window-close" title="Close">×</button>
      </div>
    </div>
    <div class="window-content">
      ${this.getContentForApp(appName)}
    </div>
    <div class="resize-handle resize-e" data-dir="e"></div>
    <div class="resize-handle resize-s" data-dir="s"></div>
    <div class="resize-handle resize-se" data-dir="se"></div>
  `;

  const size = this.appSizes[appName] || {
    width: 760,
    height: 560,
    minWidth: 400,
    minHeight: 300
  };

  const taskbarHeight = 56;
  const screenPadding = 24;

  const finalWidth = Math.min(size.width, window.innerWidth - screenPadding * 2);
  const finalHeight = Math.min(size.height, window.innerHeight - taskbarHeight - screenPadding * 2);

  const finalLeft = Math.max(
    screenPadding,
    Math.round((window.innerWidth - finalWidth) / 2)
  );

  const finalTop = Math.max(
    screenPadding,
    Math.round((window.innerHeight - taskbarHeight - finalHeight) / 2)
  );

  // IMPORTANT:
  // Set size and position BEFORE adding to the page.
  // This prevents the window from appearing at top-left first.
  windowEl.style.width = `${finalWidth}px`;
  windowEl.style.height = `${finalHeight}px`;
  windowEl.style.minWidth = `${size.minWidth}px`;
  windowEl.style.minHeight = `${size.minHeight}px`;
  windowEl.style.left = `${finalLeft}px`;
  windowEl.style.top = `${finalTop}px`;
  windowEl.style.transform = 'none';

  document.getElementById('windows-container').appendChild(windowEl);
  this.openWindows.set(appName, windowEl);

  this.bringToFront(windowEl);
  this.addTaskbarApp(appName, iconPath);
  this.setupWindowEvents(windowEl, appName);
  this.setupResizeHandles(windowEl);

  const appModule = window.PortfolioApps && window.PortfolioApps[appName];
  if (appModule && typeof appModule.init === 'function') {
    setTimeout(() => appModule.init(this, windowEl), 100);
  }

  // Apply per-window decoration
  this.applyWindowDecor(windowEl, appName);
}

  // Apply decoration styles from config to a window element
  applyWindowDecor(windowEl, appName) {
    const decorEl = windowEl.querySelector('.window-decor');
    if (!decorEl) return;

    const cfg = this.windowDecor[appName];
    if (!cfg) {
      // No config for this window — hide decoration
      decorEl.style.display = 'none';
      return;
    }

    decorEl.style.display = 'block';
    decorEl.style.backgroundImage = `url('${cfg.image}')`;
    decorEl.style.top = cfg.top || '-60px';
    decorEl.style.right = cfg.right || '80px';
    decorEl.style.width = cfg.width || '100px';
    decorEl.style.height = cfg.height || '100px';
    decorEl.style.opacity = cfg.opacity !== undefined ? cfg.opacity : 0.9;

    // Optional: custom background-size (default 'contain' preserves aspect ratio)
    decorEl.style.backgroundSize = cfg.size || 'contain';
  }

  // Swap decoration image when a window closes (called before close animation)
  swapDecorOnClose(appName) {
    const windowEl = this.openWindows.get(appName);
    if (!windowEl) return;
    const decorEl = windowEl.querySelector('.window-decor');
    if (!decorEl) return;

    // Example: swap to a "closing" variant or fade out
    // You can customize this per app in windowDecor with a 'closeImage' key
    const cfg = this.windowDecor[appName];
    if (cfg && cfg.closeImage) {
      decorEl.style.backgroundImage = `url('${cfg.closeImage}')`;
    }
    // Fade out effect
    decorEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    decorEl.style.opacity = '0';
    decorEl.style.transform = 'scale(0.8)';
  }

  closeWindow(appName) {
    const windowEl = this.openWindows.get(appName);
    if (windowEl) {
      // Swap/fade decoration before closing
      this.swapDecorOnClose(appName);

      windowEl.style.animation = 'none';
      windowEl.style.opacity = '0';
      windowEl.style.transform = 'scale(0.95)';
      windowEl.style.transition = 'all 0.2s ease';

      setTimeout(() => {
        windowEl.remove();
        this.openWindows.delete(appName);
        this.removeTaskbarApp(appName);
      }, 200);
    }
  }

  bringToFront(windowEl) {
    this.topZIndex += 1;
    windowEl.style.zIndex = this.topZIndex;
    const appName = this.getAppNameFromWindow(windowEl);
    if (appName) this.highlightTaskbarApp(appName);
  }

  getAppNameFromWindow(windowEl) {
    for (const [name, el] of this.openWindows) {
      if (el === windowEl) return name;
    }
    return null;
  }

  toggleMaximize(windowEl) {
    const isMaximized = windowEl.classList.contains('maximized');

    if (isMaximized) {
      windowEl.classList.remove('maximized');
      if (windowEl.dataset.prevTop) {
        windowEl.style.top = windowEl.dataset.prevTop;
        windowEl.style.left = windowEl.dataset.prevLeft;
        windowEl.style.width = windowEl.dataset.prevWidth || '760px';
        windowEl.style.height = windowEl.dataset.prevHeight || '560px';
      }
    } else {
      // Save current dimensions (including any resize by user)
      const computed = getComputedStyle(windowEl);
      windowEl.dataset.prevTop = windowEl.style.top;
      windowEl.dataset.prevLeft = windowEl.style.left;
      windowEl.dataset.prevWidth = computed.width;
      windowEl.dataset.prevHeight = computed.height;
      windowEl.classList.add('maximized');
    }

    this.bringToFront(windowEl);
  }

  minimizeWindow(appName) {
    const windowEl = this.openWindows.get(appName);
    if (windowEl) {
      windowEl.style.display = 'none';
      this.unhighlightTaskbarApp(appName);
    }
  }

  restoreWindow(appName) {
    const windowEl = this.openWindows.get(appName);
    if (windowEl) {
      windowEl.style.display = 'flex';
      this.bringToFront(windowEl);
      this.highlightTaskbarApp(appName);
    }
  }

  setupResize(windowEl) {
    let resizing = false;
    let resizeDir = '';
    let startX = 0, startY = 0;
    let startW = 0, startH = 0;

    windowEl.querySelectorAll('.resize-handle').forEach(handle => {
      handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        resizing = true;
        resizeDir = handle.classList.contains('se') ? 'se' : 
                    handle.classList.contains('e') ? 'e' : 's';
        startX = e.clientX;
        startY = e.clientY;
        startW = windowEl.offsetWidth;
        startH = windowEl.offsetHeight;
        windowEl.classList.add('resizing');
      });
    });

    document.addEventListener('mousemove', (e) => {
      if (!resizing) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const minW = 400;
      const minH = 300;
      const maxW = window.innerWidth - 40;
      const maxH = window.innerHeight - 80;

      if (resizeDir === 'se' || resizeDir === 'e') {
        const newW = Math.max(minW, Math.min(startW + dx, maxW));
        windowEl.style.width = newW + 'px';
      }
      if (resizeDir === 'se' || resizeDir === 's') {
        const newH = Math.max(minH, Math.min(startH + dy, maxH));
        windowEl.style.height = newH + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      if (resizing) {
        resizing = false;
        windowEl.classList.remove('resizing');
      }
    });
  }

  setupResizeHandles(windowEl) {
    windowEl.querySelectorAll('.resize-handle').forEach(handle => {
      handle.addEventListener('mousedown', (e) => {
        if (windowEl.classList.contains('maximized')) return;
        e.preventDefault();
        e.stopPropagation();

        this.resizedWindow = windowEl;
        this.resizeDir = handle.dataset.dir;
        const rect = windowEl.getBoundingClientRect();
        this.resizeStart = {
          x: e.clientX,
          y: e.clientY,
          w: rect.width,
          h: rect.height,
          left: rect.left,
          top: rect.top
        };
        windowEl.classList.add('resizing');
      });
    });
  }

  setupWindowEvents(windowEl, appName) {
    windowEl.querySelector('.window-close').addEventListener('click', () => {
      this.closeWindow(appName);
    });

    windowEl.querySelector('.window-maximize').addEventListener('click', () => {
      this.toggleMaximize(windowEl);
    });

    windowEl.querySelector('.window-minimize').addEventListener('click', () => {
      this.minimizeWindow(appName);
    });

    windowEl.addEventListener('mousedown', () => {
      this.bringToFront(windowEl);
    });

    const header = windowEl.querySelector('.window-header');
    header.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('window-control')) return;
      if (windowEl.classList.contains('maximized')) return;

      // Don't drag if clicking near resize handle (bottom-right 20px)
      const rect = windowEl.getBoundingClientRect();
      const isResizeArea = (e.clientX > rect.right - 20) && (e.clientY > rect.bottom - 20);
      if (isResizeArea) return;

      this.draggedWindow = windowEl;
      this.dragOffset.x = e.clientX - rect.left;
      this.dragOffset.y = e.clientY - rect.top;
      windowEl.classList.add('dragging');
      e.preventDefault();
    });

    // Accordion toggles
    windowEl.querySelectorAll('.accordion-header').forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        const content = toggle.nextElementSibling;
        content.classList.toggle('active');
      });
    });
  }

  // ==================== TASKBAR APPS ====================
  addTaskbarApp(appName, iconPath) {
    const container = document.getElementById('taskbar-apps');
    if (document.querySelector(`.taskbar-app[data-app="${appName}"]`)) return;

    const btn = document.createElement('button');
    btn.className = 'taskbar-app active';
    btn.dataset.app = appName;
    btn.innerHTML = `
      <img src="${iconPath}" alt="" onerror="this.style.display='none'">
      <span>${appName}</span>
    `;

    btn.addEventListener('click', () => {
      const windowEl = this.openWindows.get(appName);
      if (!windowEl) return;

      if (windowEl.style.display === 'none') {
        this.restoreWindow(appName);
      } else if (this.getTopWindow() === windowEl) {
        this.minimizeWindow(appName);
      } else {
        this.bringToFront(windowEl);
      }
    });

    container.appendChild(btn);
  }

  removeTaskbarApp(appName) {
    const btn = document.querySelector(`.taskbar-app[data-app="${appName}"]`);
    if (btn) btn.remove();
  }

  highlightTaskbarApp(appName) {
    document.querySelectorAll('.taskbar-app').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.app === appName);
    });
  }

  unhighlightTaskbarApp(appName) {
    const btn = document.querySelector(`.taskbar-app[data-app="${appName}"]`);
    if (btn) btn.classList.remove('active');
  }

  getTopWindow() {
    let topZ = 0;
    let topWin = null;
    this.openWindows.forEach((el) => {
      const z = parseInt(el.style.zIndex || 0);
      if (z > topZ) {
        topZ = z;
        topWin = el;
      }
    });
    return topWin;
  }

  // ==================== GLOBAL MOUSE ====================
  initializeGlobalMouse() {
    document.addEventListener('mousemove', (e) => {
      if (this.draggedWindow) {
        const x = e.clientX - this.dragOffset.x;
        const y = e.clientY - this.dragOffset.y;

        const maxX = window.innerWidth - this.draggedWindow.offsetWidth;
        const maxY = window.innerHeight - 56 - this.draggedWindow.offsetHeight;

        this.draggedWindow.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
        this.draggedWindow.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
      }

      if (this.resizedWindow) {
        const dx = e.clientX - this.resizeStart.x;
        const dy = e.clientY - this.resizeStart.y;
        const minW = parseInt(this.resizedWindow.style.minWidth, 10) || 400;
        const minH = parseInt(this.resizedWindow.style.minHeight, 10) || 300;
        const maxW = window.innerWidth - 20;
        const maxH = window.innerHeight - 76;

        if (this.resizeDir.includes('e')) {
          const newW = Math.max(minW, Math.min(maxW, this.resizeStart.w + dx));
          this.resizedWindow.style.width = newW + 'px';
        }
        if (this.resizeDir.includes('s')) {
          const newH = Math.max(minH, Math.min(maxH, this.resizeStart.h + dy));
          this.resizedWindow.style.height = newH + 'px';
        }
      }
    });

    document.addEventListener('mouseup', () => {
      if (this.draggedWindow) {
        this.draggedWindow.classList.remove('dragging');
        this.draggedWindow = null;
      }
      if (this.resizedWindow) {
        this.resizedWindow = null;
        this.resizeDir = null;
      }
    });
  }

  // ==================== CONTENT ====================
  getContentForApp(appName) {
    const appModule = window.PortfolioApps && window.PortfolioApps[appName];

    if (!appModule || typeof appModule.render !== 'function') {
      return '<p>Content not available</p>';
    }

    return appModule.render(this);
  }

}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  const app = new DesktopApp();
  window.desktopAppInstance = app;
  app.initializeGlobalMouse();

  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'd') {
      const existing = document.getElementById('window-Demo-Reel');
      if (!existing) {
        app.openWindow('Demo Reel');
        setTimeout(() => {
          const win = document.getElementById('window-Demo-Reel');
          if (win) app.toggleMaximize(win);
        }, 150);
      } else {
        app.bringToFront(existing);
      }
    }
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-10px); }
      40% { transform: translateX(10px); }
      60% { transform: translateX(-10px); }
      80% { transform: translateX(10px); }
    }
  `;
  document.head.appendChild(style);
});
