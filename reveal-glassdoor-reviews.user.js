// ==UserScript==
// @name         Reveal Glassdoor reviews
// @namespace    https://github.com/badele/reveal-glassdoor-reviews
// @version      1.1.0
// @description  Reveal blurred Glassdoor reviews without sharing your own
// @author       badele
// @license      GPL3
// @homepage     https://github.com/badele/reveal-glassdoor-reviews
// @supportURL   https://github.com/badele/reveal-glassdoor-reviews/issues
// @downloadURL  https://raw.githubusercontent.com/badele/reveal-glassdoor-reviews/main/reveal-glassdoor-reviews.user.js
// @updateURL    https://raw.githubusercontent.com/badele/reveal-glassdoor-reviews/main/reveal-glassdoor-reviews.user.js
// @match        https://www.glassdoor.com/*
// @match        https://www.glassdoor.co.uk/*
// @match        https://www.glassdoor.ca/*
// @match        https://www.glassdoor.com.au/*
// @match        https://www.glassdoor.ie/*
// @match        https://www.glassdoor.co.in/*
// @match        https://www.glassdoor.co.nz/*
// @match        https://www.glassdoor.sg/*
// @match        https://www.glassdoor.com.hk/*
// @match        https://www.glassdoor.fr/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function () {
    "use strict";

    // Hidde CSS overlay and button sharing experience"
    const css = `
    [data-test="blurred-review-overlay"],
    [class*="BlurredOverlay_overlay"] {
      display: none !important;
    }

    /* élargir la zone de contenu principale */
    [class*="EpLayout_mainContent"] {
      min-width: 100vw !important;
    }
  `;
    GM_addStyle(css);

    // Remove DOOM blur filter
    function unblur(root = document) {
        root.querySelectorAll('[class*="BlurredContent_blurred"]').forEach(
            (el) => {
                el.style.removeProperty("filter");
                el.style.setProperty("filter", "none", "important");
                el.style.removeProperty("pointer-events");
                el.style.setProperty("pointer-events", "auto", "important");
            },
        );
    }

    unblur();

    // Listen infinite scrool events
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            if (m.addedNodes.length) unblur();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
