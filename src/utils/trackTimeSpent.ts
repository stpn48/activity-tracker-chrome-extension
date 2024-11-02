import { getFaviconUrl } from "@/utils/getFaviconUrl";
import { timeStamp } from "console";

let intervalId: NodeJS.Timeout | null = null;

export function incrementSessionCount(count: number) {
  chrome.runtime.sendMessage({
    type: "incrementSessionCount",
    title: window.location.hostname,
    sessionCount: count,
  });
}

export function incrementTimeSpent(time: number) {
  chrome.runtime.sendMessage({
    type: "incrementTimeSpent",
    title: window.location.hostname,
    timeStamp: Date.now(),
    time,
  });
}

export function startTracking() {
  if (!intervalId) {
    intervalId = setInterval(() => incrementTimeSpent(1), 1000);
  }
}

export function stopTracking() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

export function sendActivityData() {
  chrome.runtime.sendMessage({
    type: "activityData",
    currUrl: window.location.href,
    title: window.location.hostname,
    faviconUrl: getFaviconUrl(),
  });
}
