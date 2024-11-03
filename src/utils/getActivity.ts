import { Activity } from "@/types/types";
import { useEffect, useState } from "react";

export function getActivity(id: string) {
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    chrome.storage.local.get("activities", (result) => {
      const activities: Activity[] | undefined = result["activities"];

      if (!activities) {
        console.log("No activities found");
        return;
      }

      const activity = activities.find((activity) => activity.id === id);

      if (!activity) {
        console.log("Activity not found");
        return;
      }

      setActivity(activity);
    });
  }, [setActivity]);

  return activity;
}
