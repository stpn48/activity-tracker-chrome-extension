import { Activity } from "../types/types";

export function handleIncrementTimeSpent(request: any) {
  const { time, title } = request;

  chrome.storage.local.get("activities", (result) => {
    const activities: Activity[] | undefined = result["activities"];

    if (!activities) {
      // if there are no activities, do nothing
      return;
    }

    const activityToUpdate = activities.find((activity) => activity.title === title);

    if (!activityToUpdate) {
      // if the activity doesn't exist, do nothing
      return;
    }

    const updatedActivity: Activity = {
      ...activityToUpdate,
      timeSpent: activityToUpdate.timeSpent + time,
    };

    chrome.storage.local.set({
      activities: activities.map((activity) =>
        activity.title === title ? updatedActivity : activity,
      ),
    });
  });
}
