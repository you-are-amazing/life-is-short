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
      '    <p>Full credit for <strong>Life Is Short</strong> belongs to <strong>Twisha Patel</strong>, who created and designed this productivity and goal-tracking project from the ground up. The concept is centered around making life more meaningful by tracking your journey, setting meaningful targets, and archiving your dreams and achievements along the way.</p>',
      '    <p>I, <strong>Darshan Parmar</strong>, have modified this instance of the project purely for my own personal use, to fit my day-to-day workflow. The idea, design, and original build remain entirely Twisha Patel&rsquo;s work.</p>',
      '    <p>Sincere thanks to <strong>Twisha Patel</strong> for creating and sharing such a thoughtful concept, it stands entirely on her original work.</p>',
      '    <div class="dev-note-credits">',
      '      <a href="https://github.com/twi-exe" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Created by Twisha Patel 💜 </a>',
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
    // Any element can opt into opening the developer note - the sidebar
    // button (by id, for backward compatibility) plus any element marked
    // with data-dev-note-trigger (e.g. the corner credit badge).
    const triggers = document.querySelectorAll('[data-dev-note-trigger]');
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', openDevNote);
    });
  });
})();