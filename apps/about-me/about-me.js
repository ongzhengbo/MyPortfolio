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
                <button class="linkedin-btn linkedin-btn-primary"onclick="window.open('https://www.linkedin.com/in/ong-zheng-bo-48751b347/', '_blank')">Connect</button>
                <button class="linkedin-btn linkedin-btn-outline"onclick="window.open('https://www.linkedin.com/in/ong-zheng-bo-48751b347/', '_blank')">Message</button>
                <button class="linkedin-btn linkedin-btn-outline linkedin-btn-more">⋯</button>
              </div>
            </div>

            <!-- Profile Info -->
            <div class="linkedin-info">
              <h1 class="linkedin-name">Zheng Bo</h1>
              <p class="linkedin-headline">Nanyang Polytechnic Game Development & Technology Graduate | Unity & Unreal Engine | Gameplay Systems & UI/UX</p>
              <p class="linkedin-location">📍 Singapore · <span class="linkedin-connections">500+ connections</span></p>
            </div>

            <!-- About Section -->
            <div class="linkedin-section">
              <h2 class="linkedin-section-title">About</h2>
              <p class="linkedin-section-text">
                Nanyang Polytechnic Game Development & Technology graduate with a passion for building immersive gameplay experiences. 
                I specialize in gameplay systems, UI/UX design, and tools development using Unity and Unreal Engine.
              </p>
            </div>

            <!-- Experience Section -->
            <div class="linkedin-section">
              <h2 class="linkedin-section-title">Experience</h2>

              <div class="linkedin-experience-item">
                <div class="linkedin-exp-icon">🎨</div>
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
                <div class="linkedin-exp-icon">📱</div>
                <div class="linkedin-exp-content">
                  <h3 class="linkedin-exp-title">Smart Switch Admin</h3>
                  <p class="linkedin-exp-company">Samsung · Part-time</p>
                  <p class="linkedin-exp-date">Feb 2023 · 1 mo</p>
                  <p class="linkedin-exp-location">Singapore · On-site</p>
                  <ul class="linkedin-exp-list">
                    <li>Assisted customers in seamlessly transferring data from their old devices to new Samsung smartphones using the Samsung Smart Switch tool, ensuring a smooth transition and exceptional customer experience</li>
                    <li>Provided personalized consultations and demonstrations of Samsung devices, showcasing key features and functionality to meet individual customer needs</li>
                    <li>Played a dual role as a sales associate, effectively promoting Samsung products and driving sales by understanding customer requirements and recommending suitable devices and accessories</li>
                    <li>Managed the unboxing process for customers, delivering a hands-on experience and ensuring devices were set up and ready for use</li>
                    <li>Maintained up-to-date knowledge of Samsung product lines and services, enabling high-quality support and product recommendations</li>
                    <li>Conducted regular stock counts and inventory management, ensuring accurate tracking of products and prompt restocking to meet customer demand</li>
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
                  <p class="linkedin-exp-date">Apr 2023 – Apr 2026</p>
                  <p class="linkedin-exp-location">Activities and societies: NYP Archery Club, NYP Primers</p>
                  <p class="linkedin-exp-location">Skills: OpenGL, C++, Gameplay Programming, UI/UX Design, Shader Development, Unity, Unreal Engine, C#, JavaScript, HTML/CSS, Java, MySQL</p>
                </div>
              </div>

              <div class="linkedin-experience-item">
                <div class="linkedin-exp-icon">🏫</div>
                <div class="linkedin-exp-content">
                  <h3 class="linkedin-exp-title">GCE O Level</h3>
                  <p class="linkedin-exp-company">Bedok South Secondary School</p>
                  <p class="linkedin-exp-date">Apr 2022 – Dec 2022</p>
                </div>
              </div>

              <div class="linkedin-experience-item">
                <div class="linkedin-exp-icon">💻</div>
                <div class="linkedin-exp-content">
                  <h3 class="linkedin-exp-title">IT Application Development, Information Technology</h3>
                  <p class="linkedin-exp-company">Institute of Technical Education</p>
                  <p class="linkedin-exp-date">Jan 2022 – Apr 2022</p>
                  <p class="linkedin-exp-location">Activities and societies: Student Council - Publication and Communication</p>
                </div>
              </div>

              <div class="linkedin-experience-item">
                <div class="linkedin-exp-icon">🏫</div>
                <div class="linkedin-exp-content">
                  <h3 class="linkedin-exp-title">GCE N Level</h3>
                  <p class="linkedin-exp-company">Bedok South Secondary School</p>
                  <p class="linkedin-exp-date">2018 – 2021</p>
                  <p class="linkedin-exp-location">Activities and societies: Science and Environmental Club</p>
                </div>
              </div>

            </div>

            <!-- Volunteering Section -->
            <div class="linkedin-section">
              <h2 class="linkedin-section-title">Volunteering</h2>

              <div class="linkedin-experience-item">
                <div class="linkedin-exp-icon">🎄</div>
                <div class="linkedin-exp-content">
                  <h3 class="linkedin-exp-title">Volunteer</h3>
                  <p class="linkedin-exp-company">Dementia Singapore</p>
                  <p class="linkedin-exp-date">Dec 2024 · 1 mo</p>
                  <p class="linkedin-exp-location">Social Services · Community Service</p>
                  <ul class="linkedin-exp-list">
                    <li>Participated in a special Christmas celebration event with individuals living with dementia, fostering a joyful and inclusive atmosphere</li>
                    <li>Engaged in meaningful interactions and activities, providing companionship and creating a sense of community for attendees</li>
                    <li>Assisted with event coordination, including facilitating games, serving refreshments, and distributing gifts to brighten the holiday season for participants</li>
                    <li>Demonstrated empathy and patience, ensuring a positive experience for individuals and their caregivers</li>
                  </ul>
                </div>
              </div>

              <div class="linkedin-experience-item">
                <div class="linkedin-exp-icon">🇸🇬</div>
                <div class="linkedin-exp-content">
                  <h3 class="linkedin-exp-title">NDP Volunteer – Performer and Crowd Motivator</h3>
                  <p class="linkedin-exp-company">TOUCH Community Services</p>
                  <p class="linkedin-exp-date">May 2024 – Aug 2024 · 4 mos</p>
                  <p class="linkedin-exp-location">Arts and Culture · National Day Parade 2024</p>
                  <ul class="linkedin-exp-list">
                    <li>Engaged and energized the audience by performing choreographed dance routines alongside them on the stairs, creating an immersive and festive atmosphere</li>
                    <li>Hyped up the crowd with cheers, chants, and interactive activities, ensuring high levels of enthusiasm throughout the National Day Parade</li>
                    <li>Encouraged audience participation in key moments, such as singing the National Anthem and waving flags, enhancing the collective celebration experience</li>
                    <li>Collaborated with a team of volunteers to coordinate performances and maintain a synchronized and vibrant atmosphere</li>
                    <li>Embodied national pride and community spirit through dynamic performances and active engagement with the audience</li>
                  </ul>
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