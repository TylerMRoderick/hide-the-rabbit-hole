;(() => {
  'use strict';

  /**
   * Generate options and inject into popup
   * @param {object} config
   */
  const injectHTML = (config) => {
    const app = document.getElementById('app');
    let html = '';

    for (const key in config) {
      const val = config[key];
      html += `<label for="${key}">
                  <input type="checkbox" id="${key}" name="${key}" ${val.enabled ? 'checked' : ''}>
                  ${val.displayName}
                </label>`;
    }

    app.innerHTML = html;
  };

  /**
   * Listen for checkbox changes from popup and update storage
   * @param {object} config
   */
  const setupCheckboxListeners = (config) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (evt) => {
        // update storage with new value
        config[evt.target.id].enabled = evt.target.checked;
        chrome.storage.sync.set({ config: config });

        // Re-execute content script with updated storage
        executeContentScript();
      });
    });
  };

  /* Execute content script */
  const executeContentScript = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['youtube/youtube.js']
    });
  };

  // Initialize the popup with the user's saved settings
  chrome.storage.sync.get('config', ({ config }) => {
    injectHTML(config);
    setupCheckboxListeners(config);
  });
})();