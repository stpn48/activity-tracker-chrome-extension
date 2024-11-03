import { v4 as uuidv4 } from "uuid";

import { Activity, ActivityDataMessageRequest } from "../types/types";

export function handleActivityDataMessage(request: ActivityDataMessageRequest) {
  const { currUrl, title, faviconUrl } = request;

  chrome.storage.local.get("activities", (result) => {
    const activities: Activity[] | undefined = result["activities"];

    const newActivity: Activity = {
      id: uuidv4(),
      timeSpent: 0,
      title,
      sessionCount: 1,
      hourlyTimeSpent: {},
      url: currUrl,
      faviconUrl,
    };

    if (!activities) {
      chrome.storage.local.set({
        activities: [newActivity],
      });
      return;
    }

    if (activities.some((activity) => activity.title === title)) {
      // if the activity already exists, do nothing else append that activity
      return;
    }

    chrome.storage.local.set({
      activities: [...(activities || []), newActivity],
    });
  });
}
