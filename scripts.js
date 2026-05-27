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

  // ==================== CONTENT ====================
  getContentForApp(appName) {
    switch(appName) {
      case 'About Me':
        return `
          <div class="page-shell">
            <div class="app-bar">
              <img src="assets/icons/about-me.png" class="app-bar-icon" alt="" onerror="this.style.display='none'">
              <span class="app-bar-title">About Me</span>

            </div>
            <div class="app-content">
              <div class="material-card">
                <div class="material-card-title">👤 Zheng Bo</div>
                <div class="material-card-text">
                  Game Development student at Nanyang Polytechnic. I build gameplay systems, UI, and tools 
                  in Unity and Unreal Engine. I enjoy turning ideas into polished, playable experiences 
                  through both solo and team-based projects.
                </div>
                <div style="margin-top:16px; display:flex; gap:8px; flex-wrap:wrap;">
                  <span class="chip chip-blue">🎮 Gameplay Systems</span>
                  <span class="chip chip-green">🧩 UI/UX</span>
                  <span class="chip chip-yellow">🛠 Tools & Workflows</span>
                  <span class="chip chip-red">✨ Game Feel</span>
                </div>
              </div>

              <div class="material-card">
                <div class="material-card-title">🛠 Tech Stack</div>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <span class="chip">JavaScript</span>
                  <span class="chip">HTML</span>
                  <span class="chip">CSS</span>
                  <span class="chip">C++</span>
                  <span class="chip">Java</span>
                  <span class="chip">MySQL</span>
                  <span class="chip">C#</span>
                  <span class="chip chip-blue">Unity</span>
                  <span class="chip chip-blue">Unreal Engine</span>
                </div>
              </div>
            </div>
          </div>`;

      case 'My Projects':
        return `
          <div class="page-shell">
            <div class="app-bar">
              <img src="assets/icons/my-projects.png" class="app-bar-icon" alt="" onerror="this.style.display='none'">
              <span class="app-bar-title">My Projects</span>

            </div>
            <div class="app-content">
              <div class="material-grid">

                <div class="material-card">
                  <div class="material-card-title">WahHotSia</div>
                  <div class="material-card-text">A social 3D room-building game where players design rooms, receive suggestions, visualize wind flow, and explore other players' creations.</div>
                  <div class="accordion">
                    <button class="accordion-header">
                      <span>What I Did</span>
                      <span class="accordion-arrow">▼</span>
                    </button>
                    <div class="accordion-body">
                      <ul>
                        <li>Built a 3D room-building system for interior design</li>
                        <li>Implemented suggestion system for layout improvements</li>
                        <li>Developed wind flow visualization feature</li>
                        <li>Created feature page for browsing user designs</li>
                      </ul>
                    </div>
                  </div>
                  <div style="margin-top:12px;">
                    <span class="chip chip-blue">Unity</span>
                    <span class="chip chip-green">C#</span>
                  </div>
                  <a href="https://www.youtube.com/watch?v=0uS9ZIcvuJA" target="_blank" rel="noopener" class="thumb-link">
                    <img src="https://img.youtube.com/vi/0uS9ZIcvuJA/hqdefault.jpg" alt="WahHotSia">
                  </a>
                </div>

                <div class="material-card">
                  <div class="material-card-title">Into the Canvas</div>
                  <div class="material-card-text">An internship couch co-op project where players use paint mechanics to solve puzzles together.</div>
                  <div class="accordion">
                    <button class="accordion-header">
                      <span>What I Did</span>
                      <span class="accordion-arrow">▼</span>
                    </button>
                    <div class="accordion-body">
                      <ul>
                        <li>Designed modular UI system with reusable menus</li>
                        <li>Built custom UnityEvent-style system with multi-parameter support</li>
                        <li>Developed custom toon shaders for 3D models</li>
                        <li>Implemented player stats, timer, and settings systems</li>
                        <li>Added procedural mesh destruction compatible with any mesh</li>
                      </ul>
                    </div>
                  </div>
                  <div style="margin-top:12px;">
                    <span class="chip chip-blue">Unity</span>
                    <span class="chip chip-green">C#</span>
                    <span class="chip chip-yellow">Internship</span>
                  </div>
                  <a href="https://www.youtube.com/watch?v=kYTfj2U4430" target="_blank" rel="noopener" class="thumb-link">
                    <img src="https://img.youtube.com/vi/kYTfj2U4430/hqdefault.jpg" alt="Into the Canvas">
                  </a>
                </div>

                <div class="material-card">
                  <div class="material-card-title">Vestige</div>
                  <div class="material-card-text">A story-driven 3D side-scroller in Unreal Engine with dream-like environments and emotional progression.</div>
                  <div class="accordion">
                    <button class="accordion-header">
                      <span>What I Did</span>
                      <span class="accordion-arrow">▼</span>
                    </button>
                    <div class="accordion-body">
                      <ul>
                        <li>Implemented player movement: push/pull, hang, climb, elevators</li>
                        <li>Developed advanced camera systems with dead-zones and dynamic FOV</li>
                        <li>Built interaction, item inspection, and quest systems</li>
                        <li>Created saving/loading systems and full game UI</li>
                      </ul>
                    </div>
                  </div>
                  <div style="margin-top:12px;">
                    <span class="chip chip-red">Unreal Engine</span>
                  </div>
                  <a href="https://www.youtube.com/watch?v=ULQUVjG7M-s" target="_blank" rel="noopener" class="thumb-link">
                    <img src="https://img.youtube.com/vi/ULQUVjG7M-s/hqdefault.jpg" alt="Vestige">
                  </a>
                </div>

                <div class="material-card">
                  <div class="material-card-title">Echoes Of Virtue</div>
                  <div class="material-card-text">A group project based on sustainability goals of peace, justice, and strong institutions.</div>
                  <div class="accordion">
                    <button class="accordion-header">
                      <span>What I Did</span>
                      <span class="accordion-arrow">▼</span>
                    </button>
                    <div class="accordion-body">
                      <ul>
                        <li>Implemented player controller and core gameplay systems</li>
                        <li>Built world-switching mechanics between past and future</li>
                        <li>Developed scene-transition doors and interactive elements</li>
                        <li>Created enemies, moving platforms, and multiple gameplay levels</li>
                      </ul>
                    </div>
                  </div>
                  <div style="margin-top:12px;">
                    <span class="chip chip-blue">Unity</span>
                    <span class="chip chip-green">C#</span>
                  </div>
                  <a href="https://www.youtube.com/watch?v=8CkgqogTGeM" target="_blank" rel="noopener" class="thumb-link">
                    <img src="https://img.youtube.com/vi/8CkgqogTGeM/hqdefault.jpg" alt="Echoes Of Virtue">
                  </a>
                </div>

                <div class="material-card">
                  <div class="material-card-title">Boat</div>
                  <div class="material-card-text">A group project based on the open-world survival genre.</div>
                  <div class="accordion">
                    <button class="accordion-header">
                      <span>What I Did</span>
                      <span class="accordion-arrow">▼</span>
                    </button>
                    <div class="accordion-body">
                      <ul>
                        <li>Designed and implemented game UI</li>
                        <li>Extended framework's scene manager for multiple scenes</li>
                        <li>Enabled parallel level development for open-world gameplay</li>
                        <li>Created cutscenes and physics-based systems</li>
                        <li>Designed and built the OilRig level</li>
                      </ul>
                    </div>
                  </div>
                  <div style="margin-top:12px;">
                    <span class="chip chip-yellow">C++</span>
                    <span class="chip chip-green">OpenGL</span>
                  </div>
                  <a href="https://www.youtube.com/watch?v=P6keUXjFF40" target="_blank" rel="noopener" class="thumb-link">
                    <img src="https://img.youtube.com/vi/P6keUXjFF40/hqdefault.jpg" alt="Boat">
                  </a>
                </div>

              </div>
            </div>
          </div>`;

      case 'Certificate':
        return `
          <div class="page-shell">
            <div class="app-bar">
              <img src="assets/icons/certificate.png" class="app-bar-icon" alt="" onerror="this.style.display='none'">
              <span class="app-bar-title">Certificates</span>

            </div>
            <div class="app-content">
              <div class="material-grid">
                <div class="material-card">
                  <div class="material-card-title">AWS for Game</div>
                  <img class="cert-img" src="Cert/Cert1.png" alt="AWS for Game">
                </div>
                <div class="material-card">
                  <div class="material-card-title">Introduction to Python</div>
                  <img class="cert-img" src="Cert/Cert2.png" alt="Python">
                </div>
                <div class="material-card">
                  <div class="material-card-title">Blockchain Essentials</div>
                  <img class="cert-img" src="Cert/Cert3.png" alt="Blockchain">
                </div>
                <div class="material-card">
                  <div class="material-card-title">Introduction to Cloud</div>
                  <img class="cert-img" src="Cert/Cert4.png" alt="Cloud">
                </div>
                <div class="material-card">
                  <div class="material-card-title">Data Science 101</div>
                  <img class="cert-img" src="Cert/Cert5.png" alt="Data Science">
                </div>
              </div>
            </div>
          </div>`;

      case 'Demo Reel':
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