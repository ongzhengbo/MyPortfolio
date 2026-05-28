# Portfolio app split

Structure:

- `index.html` loads the shared desktop CSS/JS plus each app folder.
- `styles.css` is now only the shared desktop/window/taskbar/login/common layout styling.
- `scripts.js` is now only the desktop OS/window manager logic.
- `apps/about-me/` contains About Me CSS and JS.
- `apps/my-projects/` contains My Projects CSS and JS.
- `apps/certificate/` contains Certificate CSS and JS.
- `apps/demo-reel/` contains Demo Reel CSS and JS.

Your existing asset paths were kept the same, for example `assets/...`, `Cert/...`, and `Videos/...`.
