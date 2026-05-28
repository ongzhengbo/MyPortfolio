window.PortfolioApps = window.PortfolioApps || {};

class DemoReelApp {
  render() {
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
  }

  init() {
    this.initDemoPlayer();
  }

  // ==================== DEMO PLAYER ====================
  initDemoPlayer() {
    const playlist = [
      { title: 'WahHotSia', src: 'assets/Videos/wahhotsia.mp4' },
      { title: 'Into the Canvas', src: 'assets/Videos/intothecanvas.mp4' },
      { title: 'Vestige', src: 'assets/Videos/vestige.mp4' }
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



}

window.PortfolioApps['Demo Reel'] = new DemoReelApp();
