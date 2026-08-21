/* ============================================================
   CYBERPUNK PORTFOLIO — MAIN JAVASCRIPT
   main.js

   Reference this file at the bottom of every page's <body>:
   <script src="main.js"></script>

   Contents:
   1. Mobile Navigation (hamburger toggle)
   2. Scroll-triggered animations (IntersectionObserver)
   3. Typewriter effect (hero tag line)
============================================================ */


/* ════════════════════════════════════════
   0. SITE-WIDE FOOTER COPYRIGHT
   Update this one line to change the footer on every page.
   ════════════════════════════════════════ */

(function() {
  const el = document.getElementById('site-copyright');
  if (el) el.textContent = '© 2026 HRTBRKRNR // All rights reserved';
}());


/* ════════════════════════════════════════
   1. MOBILE NAVIGATION
   ════════════════════════════════════════ */

/**
 * Toggles the mobile dropdown menu open/closed.
 * Called by the hamburger button's onclick attribute.
 */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

/**
 * Closes the mobile menu.
 * Called by each mobile nav link's onclick attribute so the
 * menu dismisses after the user taps a link.
 */
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// Dismiss the mobile menu when tapping outside of it
document.addEventListener('click', function (e) {
  const menu = document.getElementById('mobileMenu');
  const btn  = document.querySelector('.hamburger');
  if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove('open');
  }
});


/* ════════════════════════════════════════
   2. SCROLL-TRIGGERED ANIMATIONS
   ════════════════════════════════════════ */

/**
 * Uses IntersectionObserver to animate elements into view.
 * Elements are set to opacity:0 / translateX(-16px) in CSS
 * and this observer removes those overrides once visible.
 *
 * To animate elements on a new subpage, just give them the
 * class "animate-in" and add them to the selector list below,
 * or call observeElements() with a custom selector.
 */
function observeElements(selector) {
  const items = document.querySelectorAll(selector);
  if (!items.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity    = '1';
          entry.target.style.transform  = 'translateX(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach(function (el) { observer.observe(el); });
}

// Observe timeline items (index.html)
observeElements('.timeline-item');

// Observe any generic .animate-in elements (for subpages)
observeElements('.animate-in');


/* ════════════════════════════════════════
   3. TYPEWRITER EFFECT
   ════════════════════════════════════════ */

/**
 * Plays a typewriter animation on the hero tag line.
 * Reads the element's existing text content, clears it,
 * then types each character back in with a delay.
 *
 * Only runs if a .hero-tag element exists on the page.
 */
(function initTypewriter() {
  const el = document.querySelector('.hero-tag');
  if (!el) return;

  const fullText = el.textContent;
  el.textContent  = '';

  let index = 0;

  function typeNextChar() {
    if (index < fullText.length) {
      el.textContent += fullText[index];
      index++;
      setTimeout(typeNextChar, 38);
    }
  }

  // Short delay before starting so the page load animation settles
  setTimeout(typeNextChar, 400);
}());


/* ════════════════════════════════════════
   4. HIDDEN LORE TERMINAL
   ════════════════════════════════════════ */

/* ════════════════════════════════════════
   4. CTF NAVIGATOR TERMINAL
   ════════════════════════════════════════ */

(function initCtfTerminal() {
  const input = document.getElementById('ctfInput');
  const body  = document.getElementById('ctfTerminalBody');
  if (!input || !body) return;

  // CTF entries — order determines the number reference (1-based)
  const ctfs = [
    {
      slug:  'wicys-tdc-2025',
      label: 'WiCyS: Target Defense Challenge 2025',
      url:   'target-defense-2025.html',
      year:  '2025',
    },
    {
      slug:  'sisterhood',
      label: 'WiCyS + SANS + Flare CTF: Sisterhood of the Traveling Packets',
      url:   null,
      year:  '2026',
    },
  ];

  // Resolve arg to a CTF entry by number (1-based) or slug (case-insensitive)
  function resolve(arg) {
    const n = parseInt(arg, 10);
    if (!isNaN(n)) return ctfs[n - 1] || null;
    const lower = arg.toLowerCase();
    return ctfs.find(function(c) { return c.slug === lower; }) || null;
  }

  function print(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function echo(cmd) {
    print('<span class="t-prompt">❯ </span><span class="t-cmd">' + cmd + '</span>');
  }

  function handleCommand(raw) {
    const trimmed = raw.trim();
    const parts   = trimmed.split(/\s+/);
    const base    = parts[0].toLowerCase();
    const arg     = parts.slice(1).join(' ');

    echo(trimmed);

    if (trimmed === '') return;

    if (base === 'help') {
      print('&nbsp;');
      print('<span class="ctf-cmd-output"><span class="out-label">ls</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list all CTF write-ups</span>');
      print('<span class="ctf-cmd-output"><span class="out-label">cat &lt;# or slug&gt;</span> open a write-up by number or slug name</span>');
      print('<span class="ctf-cmd-output"><span class="out-label">clear</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clear the terminal</span>');
      print('&nbsp;');

    } else if (base === 'ls') {
      print('&nbsp;');
      ctfs.forEach(function(ctf, i) {
        const num    = '[' + (i + 1) + ']';
        const status = ctf.url
          ? '<span class="out-link" style="cursor:pointer;" onclick="window.location=\'' + ctf.url + '\'">→ OPEN</span>'
          : '<span class="out-dim">[COMING SOON]</span>';
        print('<span class="ctf-cmd-output">' + num + '  [' + ctf.year + ']  <span class="out-label">' + ctf.slug + '</span>  ' + ctf.label + '  ' + status + '</span>');
      });
      print('&nbsp;');

    } else if (base === 'cat') {
      if (!arg) {
        print('<span class="ctf-cmd-output out-error">// missing argument. usage: cat &lt;# or slug&gt;</span>');
      } else {
        const ctf = resolve(arg);
        if (ctf) {
          if (ctf.url) {
            print('<span class="ctf-cmd-output">// launching: ' + ctf.label + '</span>');
            print('<span class="ctf-cmd-output">// <a class="out-link" href="' + ctf.url + '">[LOADING — CLICK TO OPEN]</a></span>');
            setTimeout(function() { window.location = ctf.url; }, 900);
          } else {
            print('<span class="ctf-cmd-output out-error">// transmission not yet available. check back, netrunner.</span>');
          }
        } else {
          print('<span class="ctf-cmd-output out-error">// write-up not found: ' + arg + '. try \'ls\' to see available entries.</span>');
        }
      }

    } else if (base === 'clear') {
      body.innerHTML = '<div><span style="color: var(--magenta); text-shadow: 0 0 8px var(--magenta);">// CTF WRITE-UP NAVIGATOR — TYPE \'help\' TO BEGIN</span></div><div>&nbsp;</div>';

    } else if (base === 'whoami') {
      print('<span class="ctf-cmd-output">hrtbrkrnr</span>');

    } else if (base === 'sudo') {
      print('<span class="ctf-cmd-output out-error">// nice try. you\'re already root, choom.</span>');

    } else if (base === 'pwd') {
      print('<span class="ctf-cmd-output">/net/hrtbrkrnr/ctf</span>');

    } else {
      print('<span class="ctf-cmd-output out-error">// command not found: ' + base + '. type \'help\' for available commands.</span>');
    }

    print('&nbsp;');
  }

  input.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    const val = input.value;
    input.value = '';
    handleCommand(val);
  });
}());


/* ════════════════════════════════════════
   5. HIDDEN LORE TERMINAL
   ════════════════════════════════════════ */

(function initLoreTerminal() {
  const input  = document.getElementById('loreInput');
  const output = document.getElementById('loreOutput');
  if (!input || !output) return;

  const deniedLines = [
    '// ACCESS DENIED. try harder, choom.',
    '// WRONG PASSPHRASE. the net is watching.',
    '// INVALID COMMAND. are you even a netrunner?',
    '// AUTHENTICATION FAILED. nice try, flatline.',
    '// INCORRECT. who sent you?',
  ];

  let denyCount = 0;

  input.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;

    const cmd = input.value.trim().toLowerCase().replace(/\s+/g, '');
    input.value = '';
    output.innerHTML = '';

    if (cmd === 'breachprotocol') {
      output.innerHTML =
        '<div><span class="t-grant">// authenticating...</span></div>' +
        '<div><span class="t-grant">// identity confirmed. welcome back, netrunner.</span></div>' +
        '<div><span class="t-grant">// LOADING LORE . . .</span></div>' +
        '<div>&nbsp;</div>' +
        '<div><span class="t-grant">❯ </span><a href="lore.html" class="lore-link">[ACCESS GRANTED — ENTER THE LORE]</a></div>';
    } else {
      const line = deniedLines[denyCount % deniedLines.length];
      denyCount++;
      output.innerHTML = '<div><span class="t-deny">' + line + '</span></div>';
    }
  });
}());
