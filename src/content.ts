import { getFaviconUrl } from "./utils/getFaviconUrl";

let intervalId: NodeJS.Timeout | null = null;

function sendDataToBackground() {
  const title = window.location.hostname;
  const faviconUrl = getFaviconUrl();
  const currUrl = window.location.href;
  const timeSpent = 1; // 1 second

  chrome.runtime.sendMessage({
    currUrl,
    timeSpent,
    title,
    faviconUrl,
  });
}

function startTracking() {
  if (!intervalId) {
    intervalId = setInterval(sendDataToBackground, 1000);
  } else {
    clearInterval(intervalId);
    intervalId = null;
    intervalId = setInterval(sendDataToBackground, 1000);
  }
}

function stopTracking() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  sendDataToBackground(); // Final data send on unload
}

window.addEventListener("load", startTracking);
window.addEventListener("beforeunload", stopTracking);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    stopTracking();
  } else if (document.visibilityState === "visible") {
    startTracking();
  }
});
