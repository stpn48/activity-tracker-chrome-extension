import { Activity } from "../types/types";

export function handleIncrementSessionCount(request: any) {
  const { title, sessionCount } = request;

  chrome.storage.local.get("activities", (result) => {
    const activities: Activity[] | undefined = result["activities"];

    console.log("storage: ");
    chrome.storage.local.get(console.log);

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
      sessionCount: activityToUpdate.sessionCount + sessionCount,
    };

    chrome.storage.local.set({
      activities: activities.map((activity) =>
        activity.title === title ? updatedActivity : activity,
      ),
    });
  });
}
