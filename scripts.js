// STEAM PROJECTS v2 - Cache bust: 1779978241.2868285
const projectsData = [
  {
    id: 'wahhotsia',
    title: 'WahHotSia',
    shortDesc: "A social 3D room-building game where players design rooms, receive suggestions, visualize wind flow, and explore other players' creations.",
    fullDesc: `WahHotSia is a social 3D room-building game where players design rooms, receive suggestions, visualize wind flow, and explore other players' creations.<br><br><strong>What I Did:</strong><ul><li>Built a 3D room-building system for interior design</li><li>Implemented suggestion system for layout improvements</li><li>Developed wind flow visualization feature</li><li>Created feature page for browsing user designs</li></ul>`,
    tags: ['Unity', 'C#', '3D', 'Social'],
    thumbnail: 'https://img.youtube.com/vi/0uS9ZIcvuJA/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=0uS9ZIcvuJA',
    screenshots: ['https://img.youtube.com/vi/0uS9ZIcvuJA/hqdefault.jpg','https://img.youtube.com/vi/0uS9ZIcvuJA/hqdefault.jpg','https://img.youtube.com/vi/0uS9ZIcvuJA/hqdefault.jpg','https://img.youtube.com/vi/0uS9ZIcvuJA/hqdefault.jpg'],
    status: 'Completed', year: '2026', team: 'Team Project', role: 'Gameplay Programmer', featured: true
  },
  {
    id: 'intothecanvas',
    title: 'Into the Canvas',
    shortDesc: "An internship couch co-op project where players use paint mechanics to solve puzzles together.",
    fullDesc: `Into the Canvas is an internship couch co-op project where players use paint mechanics to solve puzzles together.<br><br><strong>What I Did:</strong><ul><li>Designed modular UI system with reusable menus</li><li>Built custom UnityEvent-style system with multi-parameter support</li><li>Developed custom toon shaders for 3D models</li><li>Implemented player stats, timer, and settings systems</li><li>Added procedural mesh destruction compatible with any mesh</li></ul>`,
    tags: ['Unity', 'C#', 'Internship', 'Co-op'],
    thumbnail: 'https://img.youtube.com/vi/kYTfj2U4430/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=kYTfj2U4430',
    screenshots: ['https://img.youtube.com/vi/kYTfj2U4430/hqdefault.jpg','https://img.youtube.com/vi/kYTfj2U4430/hqdefault.jpg','https://img.youtube.com/vi/kYTfj2U4430/hqdefault.jpg'],
    status: 'Completed', year: '2025', team: 'Internship', role: 'Game Developer', featured: true
  },
  {
    id: 'vestige',
    title: 'Vestige',
    shortDesc: "A story-driven 3D side-scroller in Unreal Engine with dream-like environments and emotional progression.",
    fullDesc: `Vestige is a story-driven 3D side-scroller in Unreal Engine with dream-like environments and emotional progression.<br><br><strong>What I Did:</strong><ul><li>Implemented player movement: push/pull, hang, climb, elevators</li><li>Developed advanced camera systems with dead-zones and dynamic FOV</li><li>Built interaction, item inspection, and quest systems</li><li>Created saving/loading systems and full game UI</li></ul>`,
    tags: ['Unreal Engine', 'C++', 'Blueprints', '3D'],
    thumbnail: 'https://img.youtube.com/vi/ULQUVjG7M-s/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=ULQUVjG7M-s',
    screenshots: ['https://img.youtube.com/vi/ULQUVjG7M-s/hqdefault.jpg','https://img.youtube.com/vi/ULQUVjG7M-s/hqdefault.jpg','https://img.youtube.com/vi/ULQUVjG7M-s/hqdefault.jpg'],
    status: 'Completed', year: '2025', team: 'Student Project', role: 'Gameplay Programmer', featured: true
  },
  {
    id: 'echoes',
    title: 'Echoes Of Virtue',
    shortDesc: "A group project based on sustainability goals of peace, justice, and strong institutions.",
    fullDesc: `Echoes Of Virtue is a group project based on sustainability goals of peace, justice, and strong institutions.<br><br><strong>What I Did:</strong><ul><li>Implemented player controller and core gameplay systems</li><li>Built world-switching mechanics between past and future</li><li>Developed scene-transition doors and interactive elements</li><li>Created enemies, moving platforms, and multiple gameplay levels</li></ul>`,
    tags: ['Unity', 'C#', '2D', 'Group Project'],
    thumbnail: 'https://img.youtube.com/vi/8CkgqogTGeM/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=8CkgqogTGeM',
    screenshots: ['https://img.youtube.com/vi/8CkgqogTGeM/hqdefault.jpg','https://img.youtube.com/vi/8CkgqogTGeM/hqdefault.jpg'],
    status: 'Completed', year: '2024', team: 'Group Project', role: 'Programmer', featured: false
  },
  {
    id: 'boat',
    title: 'Boat',
    shortDesc: "A group project based on the open-world survival genre.",
    fullDesc: `Boat is a group project based on the open-world survival genre.<br><br><strong>What I Did:</strong><ul><li>Designed and implemented game UI</li><li>Extended framework's scene manager for multiple scenes</li><li>Enabled parallel level development for open-world gameplay</li><li>Created cutscenes and physics-based systems</li><li>Designed and built the OilRig level</li></ul>`,
    tags: ['C++', 'OpenGL', 'Open World', 'Survival'],
    thumbnail: 'https://img.youtube.com/vi/P6keUXjFF40/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=P6keUXjFF40',
    screenshots: ['https://img.youtube.com/vi/P6keUXjFF40/hqdefault.jpg','https://img.youtube.com/vi/P6keUXjFF40/hqdefault.jpg'],
    status: 'Completed', year: '2023', team: 'Group Project', role: 'Programmer & UI Designer', featured: false
  }
];

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

  const taskbarHeight = 48;
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

  if (appName === 'Certificate') {
      setTimeout(() => this.initGalleryViewer(), 100);
    }

    if (appName === 'Demo Reel') {
    setTimeout(() => this.initDemoPlayer(), 100);
  }
}

  closeWindow(appName) {
    const windowEl = this.openWindows.get(appName);
    if (windowEl) {
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
        this.resizeDirection = handle.dataset.dir;
        const rect = windowEl.getBoundingClientRect();
        this.resizeStart = {
          x: e.clientX,
          y: e.clientY,
          width: rect.width,
          height: rect.height,
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
        const maxY = window.innerHeight - 48 - this.draggedWindow.offsetHeight;

        this.draggedWindow.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
        this.draggedWindow.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
      }

      if (this.resizedWindow) {
        const dx = e.clientX - this.resizeStart.x;
        const dy = e.clientY - this.resizeStart.y;
        const minW = 400;
        const minH = 300;
        const maxW = window.innerWidth - 20;
        const maxH = window.innerHeight - 68;

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

  // ==================== DEMO PLAYER ====================
  initDemoPlayer() {
    const playlist = [
      { title: 'WahHotSia', src: 'Videos/wahhotsia.mp4' },
      { title: 'Into the Canvas', src: 'Videos/intothecanvas.mp4' },
      { title: 'Vestige', src: 'Videos/vestige.mp4' }
    ];

    const player = document.getElementById('demoPlayer');
    const titleEl = document.getElementById('demoVideoTitle');
    const progressFill = document.getElementById('demoProgress');
    const timeEl = document.getElementById('demoTime');
    const playlistItems = document.querySelectorAll('.demo-playlist-item');
    const playBtn = document.getElementById('demoPlayBtn');
    const playlistPanel = document.getElementById('demoPlaylistPanel');
    const togglePlaylistBtn = document.getElementById('demoTogglePlaylist');

    if (!player) return;

    let index = 0;

    const updatePlayIcon = () => {
      if (playBtn) {
        playBtn.textContent = player.paused ? '▶' : '⏸';
        playBtn.title = player.paused ? 'Play' : 'Pause';
      }
    };

    const loadVideo = (i) => {
      index = i;
      const current = playlist[i];
      player.src = current.src;
      if (titleEl) titleEl.textContent = current.title;

      playlistItems.forEach((item, idx) => {
        item.classList.toggle('active', idx === i);
      });

      player.play().catch(() => {});
      updatePlayIcon();
    };

    const playPause = () => {
      if (player.paused) {
        player.play().catch(() => {});
      } else {
        player.pause();
      }
      updatePlayIcon();
    };

    const next = () => {
      loadVideo((index + 1) % playlist.length);
    };

    const prev = () => {
      loadVideo((index - 1 + playlist.length) % playlist.length);
    };

    // Playlist clicks
    playlistItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        loadVideo(idx);
      });
    });

    // Controls
    const nextBtn = document.getElementById('demoNextBtn');
    const prevBtn = document.getElementById('demoPrevBtn');

    if (playBtn) playBtn.addEventListener('click', playPause);
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // Toggle playlist visibility
    if (togglePlaylistBtn && playlistPanel) {
      togglePlaylistBtn.addEventListener('click', () => {
        const isHidden = playlistPanel.style.display === 'none';
        playlistPanel.style.display = isHidden ? 'flex' : 'none';
        togglePlaylistBtn.textContent = isHidden ? '☰' : '▤';
        togglePlaylistBtn.title = isHidden ? 'Hide playlist' : 'Show playlist';
      });
    }

    // Update play icon on native events
    player.addEventListener('play', updatePlayIcon);
    player.addEventListener('pause', updatePlayIcon);

    // Progress
    player.addEventListener('timeupdate', () => {
      if (player.duration && progressFill) {
        const pct = (player.currentTime / player.duration) * 100;
        progressFill.style.width = pct + '%';
      }
      if (timeEl && player.duration) {
        const cur = this.formatTime(player.currentTime);
        const dur = this.formatTime(player.duration);
        timeEl.textContent = `${cur} / ${dur}`;
      }
    });

    player.addEventListener('ended', () => {
      next();
    });

    // Progress bar click
    const progressBar = document.getElementById('demoProgressBar');
    if (progressBar) {
      progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        if (player.duration) {
          player.currentTime = pct * player.duration;
        }
      });
    }

    loadVideo(0);
    updatePlayIcon();
  }

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  }


  // ==================== GALLERY VIEWER ====================
  initGalleryViewer() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    const viewer = document.getElementById('photoViewer');
    const viewerImg = document.getElementById('viewerImage');
    const viewerTitle = document.getElementById('viewerTitle');
    const viewerDate = document.getElementById('viewerDate');
    const closeBtn = document.getElementById('viewerClose');
    const prevBtn = document.getElementById('viewerPrev');
    const nextBtn = document.getElementById('viewerNext');

    if (!viewer) return;

    const certs = [
      { src: 'Cert/Cert1.png', title: 'AWS for Game', date: 'May 15, 2026' },
      { src: 'Cert/Cert2.png', title: 'Introduction to Python', date: 'May 12, 2026' },
      { src: 'Cert/Cert3.png', title: 'Blockchain Essentials', date: 'May 10, 2026' },
      { src: 'Cert/Cert4.png', title: 'Introduction to Cloud', date: 'May 8, 2026' },
      { src: 'Cert/Cert5.png', title: 'Data Science 101', date: 'May 5, 2026' }
    ];

    let currentIndex = 0;

    const openViewer = (index) => {
      currentIndex = index;
      const cert = certs[index];
      viewerImg.src = cert.src;
      viewerTitle.textContent = cert.title;
      viewerDate.textContent = cert.date;
      viewer.classList.add('active');
    };

    const closeViewer = () => {
      viewer.classList.remove('active');
      setTimeout(() => {
        viewerImg.src = '';
      }, 300);
    };

    const showPrev = () => {
      currentIndex = (currentIndex - 1 + certs.length) % certs.length;
      openViewer(currentIndex);
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % certs.length;
      openViewer(currentIndex);
    };

    // Click on photo items
    grid.querySelectorAll('.gallery-photo-item').forEach((item, idx) => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.gallery-select-btn')) return;
        openViewer(idx);
      });
    });

    // Viewer controls
    if (closeBtn) closeBtn.addEventListener('click', closeViewer);
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    viewer.addEventListener('click', (e) => {
      if (e.target === viewer) closeViewer();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!viewer.classList.contains('active')) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    // View toggle
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.dataset.view;
        grid.classList.remove('compact', 'large');
        if (view === 'compact') grid.classList.add('compact');
        if (view === 'large') grid.classList.add('large');
      });
    });

    // Select all
    const selectAllBtn = document.getElementById('gallerySelectAll');
    if (selectAllBtn) {
      let allSelected = false;
      selectAllBtn.addEventListener('click', () => {
        allSelected = !allSelected;
        document.querySelectorAll('.gallery-select-btn').forEach(btn => {
          btn.classList.toggle('selected', allSelected);
        });
        selectAllBtn.textContent = allSelected ? '☑ Select all' : '☐ Select';
      });
    }

    // Individual select
    document.querySelectorAll('.gallery-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('selected');
      });
    });
  }

  // ==================== CONTENT ====================
  
  // ==================== STEAM PROJECTS RENDERER ====================
  renderSteamProjects() {
    const featured = projectsData.filter(p => p.featured);
    const all = projectsData;
    return `
      <div class="page-shell">
        <div class="app-bar">
          <img src="assets/icons/my-projects.png" class="app-bar-icon" alt="" onerror="this.style.display='none'">
          <span class="app-bar-title">My Projects</span>
        </div>
        <div class="app-content" style="padding:0;">
          <div class="steam-store-header">
            <div class="steam-nav-bar">
              <div class="steam-nav-item active">Your Store</div>
              <div class="steam-nav-item">New & Noteworthy</div>
              <div class="steam-nav-item">Categories</div>
              <div class="steam-nav-item">Points Shop</div>
              <div class="steam-nav-item">News</div>
              <div class="steam-nav-item">Labs</div>
            </div>
            <div class="steam-featured-section">
              <div class="steam-section-title">Featured & Recommended</div>
              ${this.renderSteamHero(featured[0] || all[0])}
              <div class="steam-carousel-nav">
                ${featured.map((_, i) => `<button class="steam-carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" onclick="window.desktopAppInstance.setSteamHero(${i})"></button>`).join('')}
              </div>
            </div>
          </div>
          <div class="steam-games-section">
            <div class="steam-section-title">All Projects (${all.length})</div>
            <div class="steam-games-grid">
              ${all.map(project => this.renderSteamCard(project)).join('')}
            </div>
          </div>
          <div class="steam-detail-page" id="steamDetailPage">
            ${this.renderSteamDetail()}
          </div>
        </div>
      </div>
    `;
  }

  renderSteamHero(project) {
    return `
      <div class="steam-hero-container" id="steamHero" data-project-id="${project.id}">
        <div class="steam-hero-media">
          <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
        </div>
        <div class="steam-hero-info">
          <div class="steam-hero-title">${project.title}</div>
          <div class="steam-hero-screenshots">
            ${project.screenshots.slice(0, 4).map(s => `<img src="${s}" alt="screenshot" loading="lazy">`).join('')}
          </div>
          <div class="steam-hero-desc">${project.shortDesc}</div>
          <div class="steam-hero-tags">
            ${project.tags.map(tag => `<span class="steam-tag">${tag}</span>`).join('')}
          </div>
          <div class="steam-hero-meta">
            <div>Status: <span>${project.status}</span></div>
            <div>Year: <span>${project.year}</span></div>
            <div>Team: <span>${project.team}</span></div>
          </div>
        </div>
      </div>
    `;
  }

  renderSteamCard(project) {
    return `
      <div class="steam-game-card" data-project-id="${project.id}" onclick="window.desktopAppInstance.openSteamDetail('${project.id}')">
        <div class="steam-game-thumb">
          <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
          <div class="steam-game-platforms">
            <span class="steam-platform-icon">🎮</span>
            <span class="steam-platform-icon">💻</span>
          </div>
        </div>
        <div class="steam-game-info">
          <div class="steam-game-title">${project.title}</div>
          <div class="steam-game-desc">${project.shortDesc}</div>
          <div class="steam-game-tags">
            ${project.tags.slice(0, 3).map(tag => `<span class="steam-game-tag">${tag}</span>`).join('')}
          </div>
          <div class="steam-game-bottom">
            <div class="steam-game-price">
              <span class="steam-price-final">${project.year}</span>
            </div>
            <a href="${project.videoUrl}" target="_blank" rel="noopener" class="steam-btn-green" onclick="event.stopPropagation()">
              ▶ Watch
            </a>
          </div>
        </div>
        <div class="steam-game-hover-panel">
          <div class="steam-hover-title">${project.title}</div>
          <div class="steam-hover-reviews">
            <span class="steam-review-summary">${project.status}</span>
            <span class="steam-review-count">${project.team}</span>
          </div>
          <div class="steam-hover-tags">
            ${project.tags.map(tag => `<span class="steam-tag">${tag}</span>`).join('')}
          </div>
          <div class="steam-hover-screenshots">
            ${project.screenshots.slice(0, 4).map(s => `<img src="${s}" alt="screenshot" loading="lazy">`).join('')}
          </div>
          <div class="steam-hover-desc">${project.shortDesc}</div>
        </div>
      </div>
    `;
  }

  renderSteamDetail() {
    return `
      <div class="steam-detail-header">
        <div class="steam-breadcrumb">
          <a href="#" onclick="window.desktopAppInstance.backToSteamGrid(); return false;">All Projects</a> &gt; <span id="steamBreadcrumbTitle">Project</span>
        </div>
        <div class="steam-detail-title" id="steamDetailTitle">Project Title</div>
      </div>
      <div class="steam-detail-layout">
        <div class="steam-detail-left">
          <div class="steam-detail-media">
            <img src="" alt="" id="steamDetailMedia">
          </div>
          <div class="steam-detail-thumbs" id="steamDetailThumbs"></div>
          <div class="steam-detail-desc" id="steamDetailDesc"></div>
        </div>
        <div class="steam-detail-right">
          <div class="steam-detail-sidebar">
            <img src="" alt="" id="steamDetailSidebarImg">
            <div class="steam-detail-meta-row">
              <span class="steam-detail-meta-label">Status</span>
              <span class="steam-detail-meta-value" id="steamDetailStatus"></span>
            </div>
            <div class="steam-detail-meta-row">
              <span class="steam-detail-meta-label">Year</span>
              <span class="steam-detail-meta-value" id="steamDetailYear"></span>
            </div>
            <div class="steam-detail-meta-row">
              <span class="steam-detail-meta-label">Team</span>
              <span class="steam-detail-meta-value" id="steamDetailTeam"></span>
            </div>
            <div class="steam-detail-meta-row">
              <span class="steam-detail-meta-label">Role</span>
              <span class="steam-detail-meta-value" id="steamDetailRole"></span>
            </div>
            <div class="steam-detail-meta-row">
              <span class="steam-detail-meta-label">Tags</span>
              <span class="steam-detail-meta-value" id="steamDetailTags"></span>
            </div>
            <div class="steam-detail-actions">
              <a href="#" target="_blank" rel="noopener" class="steam-btn-primary" id="steamDetailVideoBtn">
                ▶ Watch Trailer
              </a>
              <button class="steam-btn-secondary" onclick="window.desktopAppInstance.backToSteamGrid()">
                ← Back to Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setSteamHero(index) {
    const featured = projectsData.filter(p => p.featured);
    const project = featured[index];
    if (!project) return;
    const hero = document.getElementById('steamHero');
    if (!hero) return;
    hero.dataset.projectId = project.id;
    hero.querySelector('.steam-hero-media img').src = project.thumbnail;
    hero.querySelector('.steam-hero-title').textContent = project.title;
    hero.querySelector('.steam-hero-desc').textContent = project.shortDesc;
    hero.querySelector('.steam-hero-tags').innerHTML = project.tags.map(tag => `<span class="steam-tag">${tag}</span>`).join('');
    hero.querySelector('.steam-hero-screenshots').innerHTML = project.screenshots.slice(0, 4).map(s => `<img src="${s}" alt="screenshot" loading="lazy">`).join('');
    document.querySelectorAll('.steam-carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  openSteamDetail(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    const content = document.querySelector('#window-My-Projects .window-content');
    if (!content) return;
    const grid = content.querySelector('.steam-store-header');
    const gamesSection = content.querySelector('.steam-games-section');
    const detailPage = content.querySelector('#steamDetailPage');
    if (grid) grid.style.display = 'none';
    if (gamesSection) gamesSection.style.display = 'none';
    if (detailPage) {
      detailPage.classList.add('active');
      document.getElementById('steamBreadcrumbTitle').textContent = project.title;
      document.getElementById('steamDetailTitle').textContent = project.title;
      document.getElementById('steamDetailMedia').src = project.thumbnail;
      document.getElementById('steamDetailSidebarImg').src = project.thumbnail;
      document.getElementById('steamDetailStatus').textContent = project.status;
      document.getElementById('steamDetailYear').textContent = project.year;
      document.getElementById('steamDetailTeam').textContent = project.team;
      document.getElementById('steamDetailRole').textContent = project.role;
      document.getElementById('steamDetailTags').innerHTML = project.tags.map(t => `<span class="steam-tag">${t}</span>`).join(' ');
      document.getElementById('steamDetailVideoBtn').href = project.videoUrl;
      document.getElementById('steamDetailDesc').innerHTML = `<h3>About This Project</h3>${project.fullDesc}`;
      const thumbsContainer = document.getElementById('steamDetailThumbs');
      thumbsContainer.innerHTML = project.screenshots.map((s, i) => `<img src="${s}" alt="screenshot" class="${i === 0 ? 'active' : ''}" onclick="window.desktopAppInstance.setSteamDetailMedia('${s}')">`).join('');
    }
  }

  setSteamDetailMedia(src) {
    const media = document.getElementById('steamDetailMedia');
    if (media) media.src = src;
    document.querySelectorAll('#steamDetailThumbs img').forEach(img => {
      img.classList.toggle('active', img.src === src);
    });
  }

  backToSteamGrid() {
    const content = document.querySelector('#window-My-Projects .window-content');
    if (!content) return;
    const grid = content.querySelector('.steam-store-header');
    const gamesSection = content.querySelector('.steam-games-section');
    const detailPage = content.querySelector('#steamDetailPage');
    if (grid) grid.style.display = 'block';
    if (gamesSection) gamesSection.style.display = 'block';
    if (detailPage) detailPage.classList.remove('active');
  }

  getContentForApp(appName) {
    switch(appName) {
      case 'About Me':
        return `
          <div class="linkedin-profile">
            <!-- Cover Banner -->
            <div class="linkedin-banner">
              <div class="linkedin-banner-img"></div>
            </div>

            <!-- Profile Header -->
            <div class="linkedin-header">
              <div class="linkedin-avatar-wrap">
                <img src="assets/pfp/tigerpng.png" alt="Zheng Bo" class="linkedin-avatar" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                <div class="linkedin-avatar-fallback" style="display:none;">ZB</div>
              </div>
              <div class="linkedin-actions">
                <button class="linkedin-btn linkedin-btn-primary">Connect</button>
                <button class="linkedin-btn linkedin-btn-outline">Message</button>
                <button class="linkedin-btn linkedin-btn-outline linkedin-btn-more">⋯</button>
              </div>
            </div>

            <!-- Profile Info -->
            <div class="linkedin-info">
              <h1 class="linkedin-name">Zheng Bo</h1>
              <p class="linkedin-headline">Game Development Student | Unity & Unreal Engine | Gameplay Systems & UI/UX</p>
              <p class="linkedin-location">📍 Singapore · <span class="linkedin-connections">500+ connections</span></p>
            </div>

            <!-- About Section -->
            <div class="linkedin-section">
              <h2 class="linkedin-section-title">About</h2>
              <p class="linkedin-section-text">
                Game Development student at Nanyang Polytechnic with a passion for building immersive gameplay experiences. 
                I specialize in gameplay systems, UI/UX design, and tools development using Unity and Unreal Engine.
                <br><br>
                Through both solo and team-based projects, I've developed skills in player movement systems, 
                camera mechanics, interaction systems, and procedural content generation. I enjoy the challenge 
                of turning creative ideas into polished, playable experiences.
              </p>
            </div>

            <!-- Experience Section -->
            <div class="linkedin-section">
              <h2 class="linkedin-section-title">Experience</h2>

              <div class="linkedin-experience-item">
                <div class="linkedin-exp-icon">🎮</div>
                <div class="linkedin-exp-content">
                  <h3 class="linkedin-exp-title">Game Developer (Internship)</h3>
                  <p class="linkedin-exp-company">Into the Canvas Project</p>
                  <p class="linkedin-exp-date">Jan 2026 – Present · 5 mos</p>
                  <p class="linkedin-exp-location">Singapore</p>
                  <ul class="linkedin-exp-list">
                    <li>Designed modular UI system with reusable menus</li>
                    <li>Built custom UnityEvent-style system with multi-parameter support</li>
                    <li>Developed custom toon shaders for 3D models</li>
                    <li>Implemented player stats, timer, and settings systems</li>
                  </ul>
                </div>
              </div>

              <div class="linkedin-experience-item">
                <div class="linkedin-exp-icon">🎮</div>
                <div class="linkedin-exp-content">
                  <h3 class="linkedin-exp-title">Gameplay Programmer</h3>
                  <p class="linkedin-exp-company">Vestige (Student Project)</p>
                  <p class="linkedin-exp-date">Sep 2025 – Dec 2025 · 4 mos</p>
                  <p class="linkedin-exp-location">Nanyang Polytechnic</p>
                  <ul class="linkedin-exp-list">
                    <li>Implemented player movement: push/pull, hang, climb, elevators</li>
                    <li>Developed advanced camera systems with dead-zones and dynamic FOV</li>
                    <li>Built interaction, item inspection, and quest systems</li>
                    <li>Created saving/loading systems and full game UI</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Education Section -->
            <div class="linkedin-section">
              <h2 class="linkedin-section-title">Education</h2>
              <div class="linkedin-experience-item">
                <div class="linkedin-exp-icon">🎓</div>
                <div class="linkedin-exp-content">
                  <h3 class="linkedin-exp-title">Diploma in Game Development & Technology</h3>
                  <p class="linkedin-exp-company">Nanyang Polytechnic</p>
                  <p class="linkedin-exp-date">2024 – 2027</p>
                </div>
              </div>
            </div>

            <!-- Skills Section -->
            <div class="linkedin-section">
              <h2 class="linkedin-section-title">Skills</h2>
              <div class="linkedin-skills-grid">
                <div class="linkedin-skill-tag">Unity</div>
                <div class="linkedin-skill-tag">Unreal Engine</div>
                <div class="linkedin-skill-tag">C#</div>
                <div class="linkedin-skill-tag">C++</div>
                <div class="linkedin-skill-tag">JavaScript</div>
                <div class="linkedin-skill-tag">HTML/CSS</div>
                <div class="linkedin-skill-tag">Java</div>
                <div class="linkedin-skill-tag">MySQL</div>
                <div class="linkedin-skill-tag">Gameplay Programming</div>
                <div class="linkedin-skill-tag">UI/UX Design</div>
                <div class="linkedin-skill-tag">Shader Development</div>
                <div class="linkedin-skill-tag">OpenGL</div>
              </div>
            </div>

            <!-- Projects Highlight -->
            <div class="linkedin-section">
              <h2 class="linkedin-section-title">Featured Projects</h2>
              <div class="linkedin-projects-grid">
                <div class="linkedin-project-card">
                  <div class="linkedin-project-thumb" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <span>WahHotSia</span>
                  </div>
                  <div class="linkedin-project-info">
                    <h4>WahHotSia</h4>
                    <p>3D room-building social game</p>
                  </div>
                </div>
                <div class="linkedin-project-card">
                  <div class="linkedin-project-thumb" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                    <span>Into the Canvas</span>
                  </div>
                  <div class="linkedin-project-info">
                    <h4>Into the Canvas</h4>
                    <p>Couch co-op paint puzzle game</p>
                  </div>
                </div>
                <div class="linkedin-project-card">
                  <div class="linkedin-project-thumb" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <span>Vestige</span>
                  </div>
                  <div class="linkedin-project-info">
                    <h4>Vestige</h4>
                    <p>Story-driven 3D side-scroller</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

      case 'My Projects':
        return this.renderSteamProjects();

      case 'Certificate':
        return `
          <div class="page-shell">
            <div class="app-bar">
              <img src="assets/icons/certificate.png" class="app-bar-icon" alt="" onerror="this.style.display='none'">
              <span class="app-bar-title">Gallery</span>
            </div>

            <!-- Gallery Toolbar -->
            <div class="gallery-toolbar">
              <div class="gallery-toolbar-left">
                <button class="gallery-btn" id="gallerySelectAll">☐ Select</button>
                <div class="gallery-divider"></div>
                <span class="gallery-count">5 items</span>
              </div>
              <div class="gallery-toolbar-right">
                <div class="view-toggle">
                  <button class="view-toggle-btn active" data-view="grid" title="Grid view">⊞</button>
                  <button class="view-toggle-btn" data-view="large" title="Large icons">▦</button>
                </div>
              </div>
            </div>

            <div class="app-content" style="padding:0;">
              <div class="gallery-grid" id="galleryGrid">

                <div class="gallery-date-group">
                  May 2026 <span class="gallery-date-sub">5 photos</span>
                </div>

                <div class="gallery-photo-item" data-cert="0" data-title="AWS for Game" data-date="May 15, 2026">
                  <img src="Cert/Cert1.png" alt="AWS for Game" loading="lazy">
                  <div class="gallery-select-btn"></div>
                  <div class="gallery-photo-overlay">
                    <div class="gallery-photo-info">
                      <div class="gallery-photo-title">AWS for Game</div>
                      <div class="gallery-photo-date">May 15, 2026</div>
                    </div>
                  </div>
                </div>

                <div class="gallery-photo-item" data-cert="1" data-title="Introduction to Python" data-date="May 12, 2026">
                  <img src="Cert/Cert2.png" alt="Introduction to Python" loading="lazy">
                  <div class="gallery-select-btn"></div>
                  <div class="gallery-photo-overlay">
                    <div class="gallery-photo-info">
                      <div class="gallery-photo-title">Introduction to Python</div>
                      <div class="gallery-photo-date">May 12, 2026</div>
                    </div>
                  </div>
                </div>

                <div class="gallery-photo-item" data-cert="2" data-title="Blockchain Essentials" data-date="May 10, 2026">
                  <img src="Cert/Cert3.png" alt="Blockchain Essentials" loading="lazy">
                  <div class="gallery-select-btn"></div>
                  <div class="gallery-photo-overlay">
                    <div class="gallery-photo-info">
                      <div class="gallery-photo-title">Blockchain Essentials</div>
                      <div class="gallery-photo-date">May 10, 2026</div>
                    </div>
                  </div>
                </div>

                <div class="gallery-photo-item" data-cert="3" data-title="Introduction to Cloud" data-date="May 8, 2026">
                  <img src="Cert/Cert4.png" alt="Introduction to Cloud" loading="lazy">
                  <div class="gallery-select-btn"></div>
                  <div class="gallery-photo-overlay">
                    <div class="gallery-photo-info">
                      <div class="gallery-photo-title">Introduction to Cloud</div>
                      <div class="gallery-photo-date">May 8, 2026</div>
                    </div>
                  </div>
                </div>

                <div class="gallery-photo-item" data-cert="4" data-title="Data Science 101" data-date="May 5, 2026">
                  <img src="Cert/Cert5.png" alt="Data Science 101" loading="lazy">
                  <div class="gallery-select-btn"></div>
                  <div class="gallery-photo-overlay">
                    <div class="gallery-photo-info">
                      <div class="gallery-photo-title">Data Science 101</div>
                      <div class="gallery-photo-date">May 5, 2026</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Photo Viewer Modal -->
          <div class="photo-viewer-overlay" id="photoViewer">
            <button class="photo-viewer-close" id="viewerClose">×</button>
            <button class="photo-viewer-nav prev" id="viewerPrev">‹</button>
            <button class="photo-viewer-nav next" id="viewerNext">›</button>
            <div class="photo-viewer-content">
              <img id="viewerImage" src="" alt="">
              <div class="photo-viewer-info">
                <div class="photo-viewer-title" id="viewerTitle"></div>
                <div class="photo-viewer-meta" id="viewerDate"></div>
              </div>
            </div>
          </div>`;case 'Demo Reel':
        return `
          <div class="demo-player-shell">
            <div style="display:flex; flex:1; min-height:0;">
              <div class="demo-video-area">
                <video id="demoPlayer" playsinline></video>
                <div id="demoVideoTitle" class="demo-video-title">WahHotSia</div>
              </div>
              <div class="demo-playlist" id="demoPlaylistPanel">
                <div class="demo-playlist-header">Playlist</div>
                <div class="demo-playlist-item active" data-idx="0">
                  <span class="pl-num">1</span>
                  <span>WahHotSia</span>
                </div>
                <div class="demo-playlist-item" data-idx="1">
                  <span class="pl-num">2</span>
                  <span>Into the Canvas</span>
                </div>
                <div class="demo-playlist-item" data-idx="2">
                  <span class="pl-num">3</span>
                  <span>Vestige</span>
                </div>
              </div>
            </div>
            <div class="demo-controls">
              <button class="demo-ctrl-btn" id="demoPrevBtn" title="Previous">⏮</button>
              <button class="demo-ctrl-btn" id="demoPlayBtn" title="Play">▶</button>
              <button class="demo-ctrl-btn" id="demoNextBtn" title="Next">⏭</button>
              <div class="demo-progress" id="demoProgressBar">
                <div class="demo-progress-fill" id="demoProgress"></div>
              </div>
              <span class="demo-time" id="demoTime">0:00 / 0:00</span>
              <button class="demo-ctrl-btn" id="demoTogglePlaylist" title="Hide playlist" style="margin-left:8px;">☰</button>
            </div>
          </div>`;

      default:
        return '<p>Content not available</p>';
    }
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