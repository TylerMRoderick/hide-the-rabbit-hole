let config = {
  hide_homepage_feed: {
    enabled: true,
    displayName: 'Hide Homepage Feed',
  },
  hide_related: {
    enabled: true,
    displayName: 'Hide Related Videos',
  },
  hide_comments: {
    enabled: true,
    displayName: 'Hide Comments',
  },
  hide_videowall: {
    enabled: true,
    displayName: 'Hide Videowall',
  },
  hide_embedded_thumbnails: {
    enabled: true,
    displayName: 'Hide Embedded Thumbnails',
  },
  disable_autoplay: {
    enabled: true,
    displayName: 'Disable Autoplay',
  },
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ config });
});
