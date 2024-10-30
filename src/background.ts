chrome.runtime.onMessage.addListener((request) => {
  const { timeSpent, currUrl, title, faviconUrl } = request;
  chrome.storage.local.set({ [title]: { timeSpent: timeSpent, title: title, url: currUrl, faviconUrl: faviconUrl } });
});
