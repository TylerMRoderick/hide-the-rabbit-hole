;(() => {
  'use strict';

  /* Selectors */
  const html = document.querySelector('html');

  /* Set the HTML element's attibutes based on saved config */
  const toggleAttributes = () => {
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

  /* Initialize all functionality */
  const init = () => {
    toggleAttributes();
  };

  init();
})();