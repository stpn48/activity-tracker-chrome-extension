import { v4 as uuidv4 } from "uuid";
import { Activity } from "./types/types";

chrome.runtime.onMessage.addListener((request) => {
  const { timeSpent, currUrl, title, faviconUrl } = request;

  console.log("Received message from content script:", request);

  chrome.storage.local.get([title], (result) => {
    const storedData: Activity | undefined = result[title];

    const uuid = storedData ? storedData.id : uuidv4();
    const newTimeSpent = storedData ? storedData.timeSpent + timeSpent : timeSpent;

    const activity: Activity = {
      id: uuid,
      timeSpent: newTimeSpent,
      title,
      url: currUrl,
      faviconUrl,
    };

    // Set or update the activity data in storage
    chrome.storage.local.set({
      [title]: activity,
    });
  });
});

chrome.alarms.clearAll();

chrome.alarms.get("clearStorageAtMidnight", (alarm) => {
  if (alarm) return;

  chrome.alarms.create("clearStorageAtMidnight", {
    periodInMinutes: 1440,
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "clearStorageAtMidnight") {
    chrome.storage.local.clear(() => {
      console.log("Storage cleared at midnight");
    });
  }
});
