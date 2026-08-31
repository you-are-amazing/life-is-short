// Developer Note popup.
// Renders as a centered modal overlay only — it never navigates to another page.
(function () {
  function buildModal() {
    if (document.getElementById('dev-note-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'dev-note-overlay';
    overlay.className = 'dev-note-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'dev-note-title');

    overlay.innerHTML = [
      '<div class="dev-note-modal">',
      '  <button type="button" class="dev-note-close" id="dev-note-close" aria-label="Close developer note">',
      '    <i class="fa-solid fa-xmark"></i>',
      '  </button>',
      '  <h3 id="dev-note-title"><i class="fa-solid fa-code-branch"></i> Developer Note About the Project</h3>',
      '  <div class="dev-note-body">',
      '    <p><strong>Life Is Short</strong> is an inspiring productivity and goal-tracking project originally created by <strong>Twisha Patel</strong>. The concept is centered around making life more meaningful by tracking your journey, setting meaningful targets, and archiving your dreams and achievements along the way.</p>',
      '    <p>I, <strong>Darshan Parmar</strong>, have customized and extended the original project to better suit my personal workflow and requirements. The modifications focus on making the application more practical and convenient for managing daily tasks, goals, and personal progress.</p>',
      '    <p>I would like to sincerely thank Twisha Patel for creating and sharing such a thoughtful concept. Her original work provided an excellent foundation that I was able to build upon and adapt for my own use.</p>',
      '    <div class="dev-note-credits">',
      '      <a href="https://github.com/twi-exe" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Original Creator — Twisha Patel</a>',
      '      <a href="https://github.com/darshan-cpp" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Modified &amp; Maintained by — Darshan Parmar</a>',
      '    </div>',
      '    <p class="dev-note-quote">Life is short. Make it meaningful, track your journey, work toward your dreams, and preserve the progress you make along the way.</p>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) closeDevNote();
    });

    const closeBtn = document.getElementById('dev-note-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDevNote);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && overlay.classList.contains('open')) closeDevNote();
    });
  }

  function openDevNote(event) {
    if (event) event.preventDefault();
    buildModal();
    const overlay = document.getElementById('dev-note-overlay');
    overlay.classList.add('open');
    document.body.classList.add('dev-note-lock');
  }

  function closeDevNote() {
    const overlay = document.getElementById('dev-note-overlay');
    if (overlay) overlay.classList.remove('open');
    document.body.classList.remove('dev-note-lock');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const trigger = document.getElementById('dev-note-btn');
    if (trigger) trigger.addEventListener('click', openDevNote);
  });
})();
