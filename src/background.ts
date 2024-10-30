chrome.runtime.onMessage.addListener((request) => {
  const { timeSpent, currUrl, title, faviconUrl } = request;

  console.log("Received message from content script:", request);

  chrome.storage.local.get([title], (result) => {
    const storedData = result[title];

    const newTimeSpent = storedData ? storedData.timeSpent + timeSpent : timeSpent;

    // Set or update the activity data in storage
    chrome.storage.local.set({
      [title]: {
        timeSpent: newTimeSpent,
        title,
        url: currUrl,
        faviconUrl,
      },
    });
  });
});
