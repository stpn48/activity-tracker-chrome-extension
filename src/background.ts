import { MessageRequest } from "./types/types";
import { handleActivityDataMessage } from "./utils/handleActivityDataMessage";
import { handleIncrementTimeSpent } from "./utils/handleIncrementTimeSpent";
import { handleIncrementSessionCount } from "./utils/handleSessionMessage";

chrome.runtime.onMessage.addListener((request: MessageRequest) => {
  switch (request.type) {
    case "incrementTimeSpent":
      console.log("Incrementing time spent");
      handleIncrementTimeSpent(request);
      break;

    case "activityData":
      console.log("Received activity data");
      handleActivityDataMessage(request);
      break;

    case "incrementSessionCount":
      console.log("Incrementing session count");
      handleIncrementSessionCount(request);
      break;
  }
});

function setMidnightAlarm() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0); // Next midnight

  const timeUntilMidnight = midnight.getTime() - now.getTime();

  chrome.alarms.create("clearStorageAtMidnight", {
    when: Date.now() + timeUntilMidnight, // Set for midnight
    periodInMinutes: 1440, // Repeat every 24 hours
  });
}

chrome.alarms.get("clearStorageAtMidnight", (alarm) => {
  if (alarm) return;

  setMidnightAlarm();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "clearStorageAtMidnight") {
    chrome.storage.local.clear(() => {
      console.log("Storage cleared at midnight");
    });
  }
});
