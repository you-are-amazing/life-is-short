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

      '  <h3 id="dev-note-title">',
      '    <i class="fa-solid fa-code-branch"></i> Developer Note',
      '  </h3>',

      '  <div class="dev-note-body">',

      '    <p>',
      '      <strong><a href="https://github.com/you-are-amazing/life-is-short" target="_blank" rel="noopener noreferrer">Life Is Short</a></strong> was originally created and designed by ',
      '      <strong>Twisha Patel</strong> as a personal productivity and goal-tracking project. ',
      '      The original concept, design, and implementation were developed by her, ',
      '      with the idea of making life more meaningful by tracking your journey, ',
      '      setting meaningful goals, and preserving your dreams and achievements along the way.',
      '    </p>',

      '    <p>',
      '      I, <strong>Darshan Parmar</strong>, have modified and customized this version ',
      '      for my personal use to better suit my day-to-day workflow. ',
      '      These modifications are my own, while the original concept, design, ',
      '      and foundation of the project remain credited to <strong>Twisha Patel</strong>.',
      '    </p>',

      '    <p>',
      '      I sincerely thank <strong>Twisha Patel</strong> for creating ',
      '      such a thoughtful and meaningful project. I have built upon her original ',
      '      work for my own personal use and greatly appreciate the concept behind it.',
      '    </p>',

      '    <div class="dev-note-credits">',
      '      <a href="https://github.com/twi-exe" target="_blank" rel="noopener noreferrer">',
      '        <i class="fa-brands fa-github"></i> Original Project — Twisha Patel',
      '      </a>',
      '    </div>',

      '    <p class="dev-note-quote">',
      '      Life is short. Make it meaningful. Track your journey, work toward your dreams, ',
      '      and preserve the progress you make along the way.',
      '    </p>',

      '    <div class="dev-note-signature" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(0,0,0,0.1); font-size: 0.9rem; color: #666;">',
      '      <p style="margin: 0 0 0.5rem 0;"><strong>Regards,</strong></p>',
      '      <p style="margin: 0;">',
      '        <strong>Darshan Parmar</strong> ',
      '        <a href="https://github.com/you-are-amazing" target="_blank" rel="noopener noreferrer" style="color: #0366d6; text-decoration: none;">',
      '          <i class="fa-brands fa-github"></i> GitHub',
      '        </a>',
      '      </p>',
      '    </div>',

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
      if (event.key === 'Escape' && overlay.classList.contains('open')) {
        closeDevNote();
      }
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

  window.openDeveloperNoteModal = function (event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    openDevNote(event || null);
  };

  function bindDevNoteTriggers() {
    const triggers = document.querySelectorAll('[data-dev-note-trigger]');

    triggers.forEach(function (trigger) {
      if (trigger.dataset.devNoteBound === 'true') return;
      trigger.dataset.devNoteBound = 'true';

      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        openDevNote(event);
      });
    });
  }

  document.addEventListener('click', function (event) {
    const trigger = event.target && event.target.closest ? event.target.closest('[data-dev-note-trigger]') : null;
    if (!trigger) return;

    event.preventDefault();
    event.stopPropagation();
    openDevNote(event);
  });

  document.addEventListener('DOMContentLoaded', function () {
    bindDevNoteTriggers();
  });

  if (document.readyState !== 'loading') {
    bindDevNoteTriggers();
  }
})();