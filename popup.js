/**
 * Generate options and inject into popup
 * @param {object}
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

// Initialize the popup with the user's saved settings
chrome.storage.sync.get('config', ({ config }) => {
  injectHTML(config);
});
