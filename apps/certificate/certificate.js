window.PortfolioApps = window.PortfolioApps || {};

class CertificateApp {
  render() {
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
                  <img src="assets/Cert/Cert1.png" alt="AWS for Game" loading="lazy">
                  <div class="gallery-select-btn"></div>
                  <div class="gallery-photo-overlay">
                    <div class="gallery-photo-info">
                      <div class="gallery-photo-title">AWS for Game</div>
                      <div class="gallery-photo-date">May 15, 2026</div>
                    </div>
                  </div>
                </div>

                <div class="gallery-photo-item" data-cert="1" data-title="Introduction to Python" data-date="May 12, 2026">
                  <img src="assets/Cert/Cert2.png" alt="Introduction to Python" loading="lazy">
                  <div class="gallery-select-btn"></div>
                  <div class="gallery-photo-overlay">
                    <div class="gallery-photo-info">
                      <div class="gallery-photo-title">Introduction to Python</div>
                      <div class="gallery-photo-date">May 12, 2026</div>
                    </div>
                  </div>
                </div>

                <div class="gallery-photo-item" data-cert="2" data-title="Blockchain Essentials" data-date="May 10, 2026">
                  <img src="assets/Cert/Cert3.png" alt="Blockchain Essentials" loading="lazy">
                  <div class="gallery-select-btn"></div>
                  <div class="gallery-photo-overlay">
                    <div class="gallery-photo-info">
                      <div class="gallery-photo-title">Blockchain Essentials</div>
                      <div class="gallery-photo-date">May 10, 2026</div>
                    </div>
                  </div>
                </div>

                <div class="gallery-photo-item" data-cert="3" data-title="Introduction to Cloud" data-date="May 8, 2026">
                  <img src="assets/Cert/Cert4.png" alt="Introduction to Cloud" loading="lazy">
                  <div class="gallery-select-btn"></div>
                  <div class="gallery-photo-overlay">
                    <div class="gallery-photo-info">
                      <div class="gallery-photo-title">Introduction to Cloud</div>
                      <div class="gallery-photo-date">May 8, 2026</div>
                    </div>
                  </div>
                </div>

                <div class="gallery-photo-item" data-cert="4" data-title="Data Science 101" data-date="May 5, 2026">
                  <img src="assets/Cert/Cert5.png" alt="Data Science 101" loading="lazy">
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
          </div>`;
  }

  init() {
    this.initGalleryViewer();
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
      { src: 'assets/Cert/Cert1.png', title: 'AWS for Game', date: 'May 15, 2026' },
      { src: 'assets/Cert/Cert2.png', title: 'Introduction to Python', date: 'May 12, 2026' },
      { src: 'assets/Cert/Cert3.png', title: 'Blockchain Essentials', date: 'May 10, 2026' },
      { src: 'assets/Cert/Cert4.png', title: 'Introduction to Cloud', date: 'May 8, 2026' },
      { src: 'assets/Cert/Cert5.png', title: 'Data Science 101', date: 'May 5, 2026' }
    ];

    let currentIndex = 0;

const certificateWindow = grid.closest('.window');

const openViewer = (index) => {
  currentIndex = index;
  const cert = certs[index];

  viewerImg.src = cert.src;
  viewerTitle.textContent = cert.title;
  viewerDate.textContent = cert.date;

  if (certificateWindow) {
    certificateWindow.classList.add('photo-viewer-open');
  }

  viewer.classList.add('active');
};

const closeViewer = () => {
  viewer.classList.remove('active');

  if (certificateWindow) {
    certificateWindow.classList.remove('photo-viewer-open');
  }

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


}

window.PortfolioApps['Certificate'] = new CertificateApp();
