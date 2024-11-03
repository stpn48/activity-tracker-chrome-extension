import { Activity } from "../types/types";
import { convertToAMPM } from "./convertToAMPM";

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

    const hour = new Date().getHours();
    const hourBefore = convertToAMPM(hour - 1);
    const hourAfter = convertToAMPM(hour + 1);
    const formattedHour = convertToAMPM(hour);

    const updatedActivity: Activity = {
      ...activityToUpdate,
      timeSpent: activityToUpdate.timeSpent + time,

      hourlyTimeSpent: {
        ...activityToUpdate.hourlyTimeSpent,
        [hourBefore]: activityToUpdate.hourlyTimeSpent[hourBefore] || 0,
        [hourAfter]: activityToUpdate.hourlyTimeSpent[hourBefore] || 0,
        [formattedHour]: (activityToUpdate.hourlyTimeSpent[formattedHour] || 0) + time,
      },
    };

    chrome.storage.local.set({
      activities: activities.map((activity) =>
        activity.title === title ? updatedActivity : activity,
      ),
    });
  });
}
