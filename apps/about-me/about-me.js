window.PortfolioApps = window.PortfolioApps || {};

window.PortfolioApps['About Me'] = {
  render() {
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
                  <p class="linkedin-exp-date">2023 – 2026</p>
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
                  <div class="linkedin-project-thumb" style="background-image: url('assets/projects/wahhotsia.jpg'); background-size: cover; background-position: center;">
                    <span>WahHotSia</span>
                  </div>
                  <div class="linkedin-project-info">
                    <h4>WahHotSia</h4>
                    <p>3D room-building social game</p>
                  </div>
                </div>
                <div class="linkedin-project-card">
                  <div class="linkedin-project-thumb" style="background-image: url('assets/projects/wahhotsia.jpg'); background-size: cover; background-position: center;">
                    <span>Into the Canvas</span>
                  </div>
                  <div class="linkedin-project-info">
                    <h4>Into the Canvas</h4>
                    <p>Couch co-op paint puzzle game</p>
                  </div>
                </div>
                <div class="linkedin-project-card">
                  <div class="linkedin-project-thumb" style="background-image: url('assets/projects/wahhotsia.jpg'); background-size: cover; background-position: center;">
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
  }
};
