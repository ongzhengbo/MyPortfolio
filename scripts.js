class DesktopApp {
    constructor() {
      this.openWindows = new Set();
      this.draggedWindow = null;
      this.dragOffset = { x: 0, y: 0 };
      this.initializeDock();
    }
  
    initializeDock() {
      const dock = document.getElementById('dock');
      dock.addEventListener('click', (e) => {
        if (e.target.classList.contains('dock-item')) {
          const appName = e.target.dataset.app;
          this.toggleWindow(appName);
        }
      });
    }
  
    toggleWindow(appName) {
      if (this.openWindows.has(appName)) {
        this.closeWindow(appName);
      } else {
        this.openWindow(appName);
      }
    }
  
    openWindow(appName) {
      const window = document.createElement('div');
      window.className = 'window';
      window.id = `window-${appName.replace(' ', '-')}`;
  
      window.innerHTML = `
        <div class="window-header">
          <div class="window-controls">
            <button class="window-control window-close"></button>
            <button class="window-control window-minimize"></button>
            <button class="window-control window-maximize"></button>
          </div>
          <div class="window-title">${appName}</div>
        </div>
        <div class="window-content">
          ${this.getContentForApp(appName)}
        </div>
      `;
  
      document.getElementById('windows-container').appendChild(window);
      this.openWindows.add(appName);

      window.querySelector('.window-close').addEventListener('click', () => {
        this.closeWindow(appName);
      });

      window.querySelector('.window-maximize').addEventListener('click', () => {
        this.toggleMaximize(window);
      });

        window.querySelectorAll('.collapsible-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      toggle.nextElementSibling.classList.toggle('active');
    });
  });

      this.makeWindowDraggable(window);
    }
  
    closeWindow(appName) {
      const windowId = `window-${appName.replace(' ', '-')}`;
      const window = document.getElementById(windowId);
      if (window) {
        window.remove();
        this.openWindows.delete(appName);
      }
    }

toggleMaximize(window) {
  if (window.classList.contains('maximized')) {
    window.classList.remove('maximized');
    
    if (window.dataset.wasDragged === 'true') {
      window.style.top = window.dataset.originalTop;
      window.style.left = window.dataset.originalLeft;
      window.style.transform = 'none';
    } else {
      window.style.removeProperty('top');
      window.style.removeProperty('left');
      window.style.removeProperty('transform');
    }
  } else {
    if (window.style.top) {
      window.dataset.wasDragged = 'true';
      window.dataset.originalTop = window.style.top;
      window.dataset.originalLeft = window.style.left;
    } else {
      window.dataset.wasDragged = 'false';
    }
    
    window.classList.add('maximized');
    window.style.removeProperty('top');
    window.style.removeProperty('left');
    window.style.removeProperty('transform');
  }
}
  
    makeWindowDraggable(window) {
      const header = window.querySelector('.window-header');
      
      header.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('window-control')) return;
        
        this.draggedWindow = window;
        const rect = window.getBoundingClientRect();

        this.dragOffset.x = e.clientX - rect.left;
        this.dragOffset.y = e.clientY - rect.top;

        window.classList.add('dragging');
        
        e.preventDefault();
      });
    }
  
    getContentForApp(appName) {
      switch(appName) {
        case 'Certificate':
          return `
            <div style="text-align: center">
              <h2>My Certificates</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px;">
                <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px;">
                  <h3>AWS for Game</h3>
                  <img src="Cert/Cert1.png" alt="AWS for Game Certificate" style="width: 100%; height: auto; border-radius: 8px; margin-top: 8px;">
                </div>
                <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px;">
                  <h3>Introduction to Python</h3>
                  <img src="Cert/Cert2.png" alt="Introduction to Python Certificate" style="width: 100%; height: auto; border-radius: 8px; margin-top: 8px;">
                </div>
                <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px;">
                  <h3>Blockchain Essentials</h3>
                  <img src="Cert/Cert3.png" alt="Blockchain Essentials Certificate" style="width: 100%; height: auto; border-radius: 8px; margin-top: 8px;">
                </div>
                <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px;">
                  <h3>Introduction to Cloud</h3>
                  <img src="Cert/Cert4.png" alt="Introduction to Cloud Certificate" style="width: 100%; height: auto; border-radius: 8px; margin-top: 8px;">
                </div>
                <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px;">
                  <h3>Data Science 101</h3>
                  <img src="Cert/Cert5.png" alt="Data Science 101 Certificate" style="width: 100%; height: auto; border-radius: 8px; margin-top: 8px;">
                </div>
              </div>
            </div>
          `;
case 'About Me':
  return `
    <div style="text-align: center">
      <h2>Zheng Bo</h2>
      <p>Game Developer</p>

      <div style="margin-top: 24px; text-align: left;">
        <h3>About Me</h3>
        <p>
          I am a Game Development student at Nanyang Polytechnic with experience working on both
          solo and team-based projects. I enjoy building gameplay
          systems, experimenting with mechanics, and translating ideas into playable experiences.
          My work spans Unity and Unreal Engine projects, covering areas such as gameplay programming,
          collaboration in multidisciplinary teams, and iterative development.
        </p>

        <h3>Skills</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <span style="padding: 4px 12px; background: #f5f5f5; border-radius: 16px;">JavaScript</span>
          <span style="padding: 4px 12px; background: #f5f5f5; border-radius: 16px;">HTML</span>
          <span style="padding: 4px 12px; background: #f5f5f5; border-radius: 16px;">CSS</span>
          <span style="padding: 4px 12px; background: #f5f5f5; border-radius: 16px;">C++</span>
          <span style="padding: 4px 12px; background: #f5f5f5; border-radius: 16px;">Java</span>
          <span style="padding: 4px 12px; background: #f5f5f5; border-radius: 16px;">MySQL</span>
          <span style="padding: 4px 12px; background: #f5f5f5; border-radius: 16px;">C#</span>
          <span style="padding: 4px 12px; background: #f5f5f5; border-radius: 16px;">Unity</span>
          <span style="padding: 4px 12px; background: #f5f5f5; border-radius: 16px;">Unreal Engine</span>
        </div>
      </div>
    </div>
  `;
case 'My Projects':
  return `
    <div>
      <h2 style="text-align:center">My Projects</h2>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:24px;">

        <!-- Echoes Of Virtue -->
        <div style="padding:16px; border:1px solid #eee; border-radius:8px;">
          <h3>Echoes Of Virtue</h3>
          <p>
            A group project based around sustainability goals of peace, justice,
            and strong institutions.
          </p>

          <div class="collapsible-section">
            <button class="collapsible-toggle">
              <span class="toggle-arrow">▶</span>
              <span class="toggle-label">What I Did</span>
            </button>
            <div class="collapsible-content">
              <ul>
                <li>Implemented player controller and core gameplay systems.</li>
                <li>Built world-switching mechanics between past and future states.</li>
                <li>Developed doors that transition between scenes.</li>
                <li>Created enemies, moving platforms, and interactive elements.</li>
                <li>Designed and built multiple gameplay levels.</li>
              </ul>
            </div>
          </div>

          <div style="display:flex; gap:8px; margin-top:12px;">
            <span style="padding:4px 8px; background:#f5f5f5; border-radius:12px;">Unity</span>
            <span style="padding:4px 8px; background:#f5f5f5; border-radius:12px;">C#</span>
          </div>

          <a href="https://www.youtube.com/watch?v=8CkgqogTGeM" target="_blank" rel="noopener">
            <img src="https://img.youtube.com/vi/8CkgqogTGeM/hqdefault.jpg"
                 style="width:100%; margin-top:12px; border-radius:8px;">
          </a>
        </div>

        <!-- Boat -->
        <div style="padding:16px; border:1px solid #eee; border-radius:8px;">
          <h3>Boat</h3>
          <p>
            A group project based on the open-world survival genre.
          </p>

          <div class="collapsible-section">
            <button class="collapsible-toggle">
              <span class="toggle-arrow">▶</span>
              <span class="toggle-label">What I Did</span>
            </button>
            <div class="collapsible-content">
              <ul>
                <li>Designed and implemented the game UI.</li>
                <li>Extended the framework’s scene manager to support multiple scenes.</li>
                <li>Enabled parallel level development for open-world gameplay.</li>
                <li>Created cutscenes and physics-based systems.</li>
                <li>Designed and built the OilRig level.</li>
              </ul>
            </div>
          </div>

          <div style="display:flex; gap:8px; margin-top:12px;">
            <span style="padding:4px 8px; background:#f5f5f5; border-radius:12px;">C++</span>
            <span style="padding:4px 8px; background:#f5f5f5; border-radius:12px;">OpenGL</span>
          </div>

          <a href="https://www.youtube.com/watch?v=P6keUXjFF40" target="_blank" rel="noopener">
            <img src="https://img.youtube.com/vi/P6keUXjFF40/hqdefault.jpg"
                 style="width:100%; margin-top:12px; border-radius:8px;">
          </a>
        </div>

        <!-- Vestige -->
        <div style="padding:16px; border:1px solid #eee; border-radius:8px;">
          <h3>Vestige</h3>
          <p>
            A story-driven 3D side-scroller built in Unreal Engine,
            focusing on dream-like environments and emotional progression.
          </p>

          <div class="collapsible-section">
            <button class="collapsible-toggle">
              <span class="toggle-arrow">▶</span>
              <span class="toggle-label">What I Did</span>
            </button>
            <div class="collapsible-content">
              <ul>
                <li>Implemented player movement including push/pull, hang, climb, and elevators.</li>
                <li>Developed advanced camera systems with dead-zones, smoothing, and dynamic FOV.</li>
                <li>Built interaction and item inspection systems.</li>
                <li>Implemented quest system and full game UI.</li>
                <li>Created saving and loading systems.</li>
              </ul>
            </div>
          </div>

          <span style="padding:4px 8px; background:#f5f5f5; border-radius:12px;">Unreal Engine</span>

          <a href="https://www.youtube.com/watch?v=ULQUVjG7M-s" target="_blank" rel="noopener">
            <img src="https://img.youtube.com/vi/ULQUVjG7M-s/hqdefault.jpg"
                 style="width:100%; margin-top:12px; border-radius:8px;">
          </a>
        </div>

        <!-- Into the Canvas -->
        <div style="padding:16px; border:1px solid #eee; border-radius:8px;">
          <h3>Into the Canvas</h3>
          <p>
            An internship couch co-op project where players use paint mechanics
            to solve puzzles together.
          </p>

          <div class="collapsible-section">
            <button class="collapsible-toggle">
              <span class="toggle-arrow">▶</span>
              <span class="toggle-label">What I Did</span>
            </button>
            <div class="collapsible-content">
              <ul>
                <li>Designed and implemented a modular UI system to support reusable menus and scalable UI flows.</li>
                <li>Built a custom UnityEvent-style system with an improved Inspector that supports multiple parameters.</li>
                <li>Developed custom toon shaders for 3D models.</li>
                <li>Integrated UI animations with polish effects such as gradient backgrounds and selection feedback.</li>
                <li>Implemented player stats and timer systems, along with game and audio settings menus.</li>
                <li>Added controller-friendly UX features including auto-scrolling settings navigation.</li>
                <li>Implemented procedural mesh destruction compatible with any mesh.</li>
                <li>Prototyped obstacle mechanics and player throwing trajectory, then handed off to a teammate for final integration.</li>
              </ul>
            </div>
          </div>

          <div style="display:flex; gap:8px; margin-top:12px;">
            <span style="padding:4px 8px; background:#f5f5f5; border-radius:12px;">Unity</span>
            <span style="padding:4px 8px; background:#f5f5f5; border-radius:12px;">C#</span>
            <span style="padding:4px 8px; background:#f5f5f5; border-radius:12px;">Internship</span>
          </div>

          <a href="https://www.youtube.com/watch?v=kYTfj2U4430" target="_blank" rel="noopener">
            <img src="https://img.youtube.com/vi/kYTfj2U4430/hqdefault.jpg"
                 style="width:100%; margin-top:12px; border-radius:8px;">
          </a>
        </div>

      </div>
    </div>
  `;

    default:
      return '<p>Content not available</p>';
  }
}
  }

  document.addEventListener('DOMContentLoaded', () => {
    const app = new DesktopApp();

    document.addEventListener('mousemove', (e) => {
      if (app.draggedWindow) {
        const x = e.clientX - app.dragOffset.x;
        const y = e.clientY - app.dragOffset.y;
        
        const maxX = window.innerWidth - app.draggedWindow.offsetWidth;
        const maxY = window.innerHeight - app.draggedWindow.offsetHeight;
        
        const boundedX = Math.max(0, Math.min(x, maxX));
        const boundedY = Math.max(0, Math.min(y, maxY));
        
        app.draggedWindow.style.left = boundedX + 'px';
        app.draggedWindow.style.top = boundedY + 'px';
        app.draggedWindow.style.transform = 'none';
        app.draggedWindow.style.right = 'auto';
        app.draggedWindow.style.bottom = 'auto';
      }
    });
    
    document.addEventListener('mouseup', () => {
      if (app.draggedWindow) {
        app.draggedWindow.classList.remove('dragging');
        app.draggedWindow = null;
      }
    });
  });