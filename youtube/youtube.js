;(() => {
  'use strict';

  /**
   * Determine if the user is on a video page by checking the url pathname
   * @returns {boolean}
   */
   const isVideoPage = () => {
    const { pathname = '' } = window.location || {};

    return pathname === '/watch';
  };

  /** Toggle the autoplay button to "off" while visiting a video page */
  const disableAutoPlay = () => {
    const disableAutoPlayInterval = window.setInterval((window) => {
      const autoPlayButton = document.querySelector('[data-tooltip-target-id="ytp-autonav-toggle-button"]');
      const { title = '' } = autoPlayButton || {};
      const isTurnedOn = title.toLowerCase().includes('on');

      if (isTurnedOn) {
        autoPlayButton.click();
      } else {
        window.clearInterval(disableAutoPlayInterval);
      }
    }, 500, window);
  };

  /* Set the HTML element's attibutes based on saved config */
  const toggleAttributes = () => {
    const html = document.querySelector('html');

    chrome.storage.sync.get('config', ({ config }) => {
      for (const key in config) {
        if (config[key].enabled) {
          html.setAttribute(key, true);
        } else {
          html.removeAttribute(key);
        }
      }
    });
  };

  /** Disable autoplay on page updates */
  const handlePageUpdate = () => {
    chrome.storage.sync.get('config', ({ config }) => {
      if (isVideoPage() && config.disable_autoplay.enabled) {
        disableAutoPlay();
      };
    });
  };

  /* Initialize all functionality */
  const init = () => {
    toggleAttributes();
    handlePageUpdate();

    // Listen for youtube navigation changes
    window.addEventListener('yt-navigate-finish', handlePageUpdate);
  };

  init();
})();