import { getFaviconUrl } from "./utils/getFaviconUrl";

let intervalId: NodeJS.Timeout | null = null;
let observer: MutationObserver | null = null;

// Activity tracking functions
function sendActivityData() {
  chrome.runtime.sendMessage({
    type: "activityData",
    currUrl: window.location.href,
    title: window.location.hostname,
    faviconUrl: getFaviconUrl(),
  });
}

function incrementSessionCount(count: number) {
  chrome.runtime.sendMessage({
    type: "incrementSessionCount",
    title: window.location.hostname,
    sessionCount: count,
  });
}

function incrementTimeSpent(time: number) {
  chrome.runtime.sendMessage({
    type: "incrementTimeSpent",
    title: window.location.hostname,
    time,
  });
}

// Tracking control functions
function startTracking() {
  if (!intervalId) {
    intervalId = setInterval(() => incrementTimeSpent(1), 1000);
  }
}

function stopTracking() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Thumbnail blurring functions
function blurYtThumbnails(state: boolean) {
  const thumbnails = document.querySelectorAll(
    "img.yt-core-image.yt-core-image--fill-parent-height.yt-core-image--fill-parent-width.yt-core-image--content-mode-scale-aspect-fill.yt-core-image--loaded",
  );

  // If state is false, remove blur from all thumbnails
  if (!state) {
    thumbnails.forEach((thumbnail) => {
      (thumbnail as HTMLElement).style.filter = "";
    });
    return;
  }

  thumbnails.forEach((thumbnail) => {
    (thumbnail as HTMLElement).style.filter = "blur(50px)";
  });
}

function startObserver() {
  if (!observer) {
    observer = new MutationObserver(() => {
      blurYtThumbnails(true); // Call blur with state true
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

function stopObserver() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}
// Initialize observers and event listeners
function init() {
  window.addEventListener("load", () => {
    sendActivityData();
    incrementSessionCount(1);
    startTracking();
  });

  window.addEventListener("beforeunload", stopTracking);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      stopTracking();
    } else if (document.visibilityState === "visible") {
      incrementSessionCount(1);
      startTracking();
    }
  });

  chrome.storage.local.onChanged.addListener((changes) => {
    if (changes.focusState.newValue.blurYoutubeThumbnails) {
      blurYtThumbnails(true);
      startObserver();
    } else {
      blurYtThumbnails(false);
      stopObserver();
    }
  });
}

chrome.storage.local.get("focusState", (result) => {
  if (result.focusState.blurYoutubeThumbnails) {
    blurYtThumbnails(true);
    startObserver();
  }
});

// Start the script
init();
