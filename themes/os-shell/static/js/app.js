// OS Shell — Minimal interactivity
(function () {
  'use strict';

  // Clock
  function updateClock() {
    var el = document.getElementById('menubar-clock');
    if (!el) return;
    var now = new Date();
    var h = now.getHours();
    var m = String(now.getMinutes()).padStart(2, '0');
    var period = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    el.textContent = h + ':' + m + ' ' + period;
  }
  updateClock();
  setInterval(updateClock, 30000);

  // Sidebar toggle
  var toggle = document.getElementById('explorer-toggle');
  var explorer = document.getElementById('file-explorer');
  if (toggle && explorer) {
    // Restore state
    var collapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    if (collapsed) explorer.classList.add('collapsed');

    toggle.addEventListener('click', function () {
      explorer.classList.toggle('collapsed');
      localStorage.setItem('sidebar-collapsed', explorer.classList.contains('collapsed'));
    });

    // Auto-collapse on mobile
    if (window.innerWidth <= 768) {
      explorer.classList.add('collapsed');
    }
  }

  // Tab close (navigates back to list)
  document.querySelectorAll('.tab-close').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.history.back();
    });
  });
})();
