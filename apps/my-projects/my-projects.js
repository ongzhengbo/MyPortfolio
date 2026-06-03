window.PortfolioApps = window.PortfolioApps || {};

const projectsData = [
  {
    id: 'wahhotsia',
    title: 'WahHotSia',
    shortDesc: "A social 3D room-building game where players design rooms, receive suggestions, visualize wind flow, and explore other players' creations.",
    fullDesc: `WahHotSia is a social 3D room-building game where players design rooms, save and load their creations, receive suggestions, visualize wind flow, and explore other players' creations.<br><br><strong>What I Did:</strong><ul><li>Built a 3D room-building system for interior design</li><li>Implemented saving and loading for room designs</li><li>Implemented suggestion system for layout improvements</li><li>Developed wind flow visualization feature</li><li>Created feature page for browsing user room designs</li></ul>`,
    tags: ['Unity', 'C#', '3D', 'Social', 'SQl', 'Database', 'Json'],
    images: [
      'https://img.youtube.com/vi/0uS9ZIcvuJA/hqdefault.jpg',
      'assets/projects/wahhotsia/screenshot-1.png',
      'assets/projects/wahhotsia/screenshot-2.png',
      'assets/projects/wahhotsia/screenshot-3.png',
      'assets/projects/wahhotsia/screenshot-4.png'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=0uS9ZIcvuJA',
    status: 'Completed',
    year: '2026',
    team: 'Solo Project',
    role: 'Programmer',
    featured: true
  },
  {
    id: 'intothecanvas',
    title: 'Into the Canvas',
    shortDesc: "An internship couch co-op project where players use paint mechanics to solve puzzles together.",
    fullDesc: `Into the Canvas is an internship couch co-op project where players use paint mechanics to solve puzzles together.<br><br><strong>What I Did:</strong><ul><li>Designed modular UI system with reusable menus</li><li>Built custom UnityEvent-style system with multi-parameter support</li><li>Developed custom toon shaders for 3D models</li><li>Implemented player stats, timer, and settings systems</li><li>Added procedural mesh destruction compatible with any mesh</li></ul>`,
    tags: ['Unity', 'C#', 'Internship', 'Co-op'],
    images: [
      'https://img.youtube.com/vi/kYTfj2U4430/hqdefault.jpg',
      'assets/projects/intothecanvas/screenshot-1.png',
      'assets/projects/intothecanvas/screenshot-2.png',
      'assets/projects/intothecanvas/screenshot-3.png'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=kYTfj2U4430',
    status: 'Completed',
    year: '2025',
    team: 'Internship',
    role: 'Game Programmer',
    featured: true
  },
  {
    id: 'vestige',
    title: 'Vestige',
    shortDesc: "A story-driven 3D side-scroller in Unreal Engine with dream-like environments and emotional progression.",
    fullDesc: `Vestige is a story-driven 3D side-scroller in Unreal Engine with dream-like environments and emotional progression.<br><br><strong>What I Did:</strong><ul><li>Implemented player movement: push/pull, hang, climb, elevators</li><li>Developed advanced camera systems with dead-zones and dynamic FOV</li><li>Built interaction, item inspection, and quest systems</li><li>Created saving/loading systems and full game UI</li></ul>`,
    tags: ['Unreal Engine', 'C++', 'Blueprints', '3D'],
    images: [
      'assets/projects/vestige/screenshot-1.png',
      'assets/projects/vestige/screenshot-2.png',
      'assets/projects/vestige/screenshot-3.jpg',
      'assets/projects/vestige/screenshot-3.png'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=ULQUVjG7M-s',
    status: 'Completed',
    year: '2025',
    team: 'Student Project',
    role: 'Gameplay Programmer',
    featured: true
  },
  {
    id: 'echoes',
    title: 'Echoes Of Virtue',
    shortDesc: "A group project based on sustainability goals of peace, justice, and strong institutions.",
    fullDesc: `Echoes Of Virtue is a group project based on sustainability goals of peace, justice, and strong institutions.<br><br><strong>What I Did:</strong><ul><li>Implemented player controller and core gameplay systems</li><li>Built world-switching mechanics between past and future</li><li>Developed scene-transition doors and interactive elements</li><li>Created enemies, moving platforms, and multiple gameplay levels</li></ul>`,
    tags: ['Unity', 'C#', '2D', 'Group Project'],
    images: [
      'https://img.youtube.com/vi/8CkgqogTGeM/hqdefault.jpg',
      'assets/projects/echoes/screenshot-1.png',
      'assets/projects/echoes/screenshot-2.png'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=8CkgqogTGeM',
    status: 'Completed',
    year: '2024',
    team: 'Group Project',
    role: 'Gameplay Programmer',
    featured: false
  },
  {
    id: 'boat',
    title: 'Boat',
    shortDesc: "A group project based on the open-world survival genre.",
    fullDesc: `Boat is a group project based on the open-world survival genre.<br><br><strong>What I Did:</strong><ul><li>Designed and implemented game UI</li><li>Extended framework's scene manager for multiple scenes</li><li>Enabled parallel level development for open-world gameplay</li><li>Created cutscenes and physics-based systems</li><li>Designed and built the OilRig level</li></ul>`,
    tags: ['C++', 'OpenGL', 'Open World', 'Survival'],
    images: [
      'https://img.youtube.com/vi/P6keUXjFF40/hqdefault.jpg',
      'assets/projects/boat/screenshot-1.png',
      'assets/projects/boat/screenshot-2.png'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=P6keUXjFF40',
    status: 'Completed',
    year: '2023',
    team: 'Group Project',
    role: 'Programmer',
    featured: false
  }
];

class MyProjectsApp {
  render() {
    return this.renderSteamProjects();
  }

  // The first image is always the main/cover image.
  // Extra images after that are shown as Steam-style screenshots.
  getProjectImages(project) {
    if (!project) return [];

    const imageList = Array.isArray(project.images) && project.images.length > 0
      ? project.images
      : [project.thumbnail, ...(project.screenshots || [])];

    return imageList.filter(Boolean);
  }

  getMainImage(project) {
    return this.getProjectImages(project)[0] || '';
  }

  getExtraImages(project) {
    return this.getProjectImages(project).slice(1);
  }

  getGalleryImages(project) {
    const images = this.getProjectImages(project);
    return images.length > 0 ? images : [''];
  }

  renderSteamScreenshotGrid(project, limit = 4) {
    const extraImages = this.getExtraImages(project).slice(0, limit);

    if (extraImages.length === 0) {
      return `<div class="steam-no-extra-screenshots">No extra screenshots added yet</div>`;
    }

    return extraImages.map((image, index) => `
      <img
        src="${image}"
        alt="${project.title} screenshot ${index + 1}"
        loading="lazy"
        onclick="event.stopPropagation(); window.PortfolioApps['My Projects'].setSteamHeroMedia('${project.id}', ${index + 1})"
        onerror="this.style.display='none'"
      >
    `).join('');
  }

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
                ${featured.map((_, i) => `
                  <button
                    class="steam-carousel-dot ${i === 0 ? 'active' : ''}"
                    data-index="${i}"
                    onclick="window.PortfolioApps['My Projects'].setSteamHero(${i})"
                  ></button>
                `).join('')}
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
    const mainImage = this.getMainImage(project);

    return `
      <div class="steam-hero-container" id="steamHero" data-project-id="${project.id}">
        <div class="steam-hero-media">
          <img src="${mainImage}" alt="${project.title}" loading="lazy" onerror="this.style.display='none'">
        </div>

        <div class="steam-hero-info">
          <div class="steam-hero-title">${project.title}</div>

          <div class="steam-hero-screenshots">
            ${this.renderSteamScreenshotGrid(project, 4)}
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
    const mainImage = this.getMainImage(project);
    const extraImages = this.getExtraImages(project);

    return `
      <div class="steam-game-card" data-project-id="${project.id}" onclick="window.PortfolioApps['My Projects'].openSteamDetail('${project.id}')">
        <div class="steam-game-thumb">
          <img src="${mainImage}" alt="${project.title}" loading="lazy" onerror="this.style.display='none'">

          ${extraImages.length > 0 ? `<div class="steam-image-count">+${extraImages.length}</div>` : ''}

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
            ${this.renderSteamScreenshotGrid(project, 4)}
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
          <a href="#" onclick="window.PortfolioApps['My Projects'].backToSteamGrid(); return false;">All Projects</a> &gt; <span id="steamBreadcrumbTitle">Project</span>
        </div>

        <div class="steam-detail-title" id="steamDetailTitle">Project Title</div>
      </div>

      <div class="steam-detail-layout">
        <div class="steam-detail-left">
          <div class="steam-detail-media">
            <img src="" alt="" id="steamDetailMedia" onerror="this.style.display='none'">
          </div>

          <div class="steam-detail-thumbs" id="steamDetailThumbs"></div>
          <div class="steam-detail-desc" id="steamDetailDesc"></div>
        </div>

        <div class="steam-detail-right">
          <div class="steam-detail-sidebar">
            <img src="" alt="" id="steamDetailSidebarImg" onerror="this.style.display='none'">

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

              <button class="steam-btn-secondary" onclick="window.PortfolioApps['My Projects'].backToSteamGrid()">
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
    hero.querySelector('.steam-hero-media img').src = this.getMainImage(project);
    hero.querySelector('.steam-hero-media img').style.display = 'block';
    hero.querySelector('.steam-hero-title').textContent = project.title;
    hero.querySelector('.steam-hero-desc').textContent = project.shortDesc;
    hero.querySelector('.steam-hero-tags').innerHTML = project.tags.map(tag => `<span class="steam-tag">${tag}</span>`).join('');
    hero.querySelector('.steam-hero-screenshots').innerHTML = this.renderSteamScreenshotGrid(project, 4);

    document.querySelectorAll('.steam-carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  setSteamHeroMedia(projectId, imageIndex) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const image = this.getProjectImages(project)[imageIndex];
    if (!image) return;

    const hero = document.getElementById('steamHero');
    if (!hero) return;

    const heroImage = hero.querySelector('.steam-hero-media img');
    if (!heroImage) return;

    heroImage.src = image;
    heroImage.style.display = 'block';

    hero.querySelectorAll('.steam-hero-screenshots img').forEach((img, i) => {
      img.classList.toggle('active', i + 1 === imageIndex);
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
    const mainImage = this.getMainImage(project);
    const galleryImages = this.getGalleryImages(project);

    if (grid) grid.style.display = 'none';
    if (gamesSection) gamesSection.style.display = 'none';

    if (detailPage) {
      detailPage.classList.add('active');

      document.getElementById('steamBreadcrumbTitle').textContent = project.title;
      document.getElementById('steamDetailTitle').textContent = project.title;

      const detailMedia = document.getElementById('steamDetailMedia');
      const sidebarImage = document.getElementById('steamDetailSidebarImg');

      detailMedia.src = mainImage;
      detailMedia.alt = project.title;
      detailMedia.style.display = 'block';

      sidebarImage.src = mainImage;
      sidebarImage.alt = project.title;
      sidebarImage.style.display = 'block';

      document.getElementById('steamDetailStatus').textContent = project.status;
      document.getElementById('steamDetailYear').textContent = project.year;
      document.getElementById('steamDetailTeam').textContent = project.team;
      document.getElementById('steamDetailRole').textContent = project.role;
      document.getElementById('steamDetailTags').innerHTML = project.tags.map(t => `<span class="steam-tag">${t}</span>`).join(' ');
      document.getElementById('steamDetailVideoBtn').href = project.videoUrl;
      document.getElementById('steamDetailDesc').innerHTML = `<h3>About This Project</h3>${project.fullDesc}`;

      const thumbsContainer = document.getElementById('steamDetailThumbs');
      thumbsContainer.innerHTML = galleryImages.map((image, index) => `
        <img
          src="${image}"
          alt="${project.title} image ${index + 1}"
          class="${index === 0 ? 'active' : ''}"
          onclick="window.PortfolioApps['My Projects'].setSteamDetailMediaByIndex('${project.id}', ${index})"
          onerror="this.style.display='none'"
        >
      `).join('');
    }
  }

  setSteamDetailMediaByIndex(projectId, imageIndex) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const image = this.getProjectImages(project)[imageIndex];
    if (!image) return;

    this.setSteamDetailMedia(image, imageIndex);
  }

  setSteamDetailMedia(src, activeIndex = -1) {
    const media = document.getElementById('steamDetailMedia');

    if (media) {
      media.src = src;
      media.style.display = 'block';
    }

    document.querySelectorAll('#steamDetailThumbs img').forEach((img, index) => {
      img.classList.toggle('active', index === activeIndex || img.getAttribute('src') === src);
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
}

window.PortfolioApps['My Projects'] = new MyProjectsApp();