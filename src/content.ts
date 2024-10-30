let startTime: number;
let currUrl: string;

function sendMsgToBackground(timeSpent: number, currUrl: string, title: string, faviconUrl: string) {
  chrome.runtime.sendMessage({
    timeSpent,
    currUrl,
    title,
    faviconUrl,
  });
}

function getFaviconUrl() {
  const linkElements = document.querySelectorAll("link[rel*='icon'], link[rel='shortcut icon']");
  let faviconUrl = "";

  // Look for a high-resolution icon (if available)
  for (const link of linkElements) {
    const linkElement = link as HTMLLinkElement;

    // Check for sizes attribute
    const sizes = linkElement.getAttribute("sizes") || "";

    // Prioritize larger icons if sizes are specified
    if (sizes.includes("192x192") || sizes.includes("512x512")) {
      faviconUrl = linkElement.href;
      break; // Found a high-res icon, exit loop
    }

    // If no sizes specified, take the first available icon
    if (!faviconUrl) {
      faviconUrl = linkElement.href;
    }
  }

  // Fallback to the common favicon path if nothing found
  if (!faviconUrl) {
    const commonFaviconUrl = `${window.location.origin}/favicon.ico`;
    return commonFaviconUrl; // Return common favicon URL
  }

  return faviconUrl; // Return found favicon URL or fallback
}

function handlePageLoad() {
  const now = Date.now();

  if (currUrl) {
    const timeSpent = Math.round((now - startTime) / 1000);
    const title = window.location.hostname;
    const faviconUrl = getFaviconUrl();
    sendMsgToBackground(timeSpent, currUrl, title, faviconUrl);
  }

  startTime = now;
  currUrl = window.location.href;
}

function handlePageUnload() {
  const timeSpent = Math.round((Date.now() - startTime) / 1000);
  const title = window.location.hostname;
  const faviconUrl = getFaviconUrl();
  sendMsgToBackground(timeSpent, currUrl, title, faviconUrl);
}

window.addEventListener("load", handlePageLoad);
window.addEventListener("beforeunload", handlePageUnload);
