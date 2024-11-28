class DesktopApp {
    constructor() {
      this.openWindows = new Set();
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
          window.style.removeProperty('top');
          window.style.removeProperty('left');
        } else {
          window.classList.add('maximized');
          window.style.removeProperty('top');
          window.style.removeProperty('left');
        }
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
              <div style="width: 128px; height: 128px; background: #eee; border-radius: 50%; margin: 0 auto 16px;"></div>
              <h2>Zheng Bo</h2>
              <p>Game Developer</p>
              <div style="margin-top: 24px; text-align: left;">
                <h3>About Me</h3>
                <p>NYP Game Development Student</p>
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
                </div>
              </div>
            </div>
          `;
          case 'My Projects':
            return `
              <div>
                <h2 style="text-align: center">My Projects</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px;">

                  <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px;">
                    <h3>Echoes Of Virtue</h3>
                    <p>A group project based around sustainability goals of peace, justice, and strong institutions.</p>
                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                      <span style="padding: 4px 8px; background: #f5f5f5; border-radius: 12px; font-size: 12px;">Unity</span>
                      <span style="padding: 4px 8px; background: #f5f5f5; border-radius: 12px; font-size: 12px;">C#</span>
                    </div>
                    <div style="margin-top: 12px; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                      <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/8CkgqogTGeM" frameborder="0" allowfullscreen></iframe>
                    </div>
                  </div>

                  <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px;">
                    <h3>Boat</h3>
                    <p>A group project based on the OpenWorld Survival game genre.</p>
                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                      <span style="padding: 4px 8px; background: #f5f5f5; border-radius: 12px; font-size: 12px;">C++</span>
                      <span style="padding: 4px 8px; background: #f5f5f5; border-radius: 12px; font-size: 12px;">OpenGL</span>
                    </div>
                    <div style="margin-top: 12px; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                      <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/P6keUXjFF40" frameborder="0" allowfullscreen></iframe>
                    </div>
                  </div>

                </div>
              </div>
            `;
        default:
          return '<p>Content not available</p>';
      }
    }
  }
  
  // Initialize the desktop when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new DesktopApp();
  });