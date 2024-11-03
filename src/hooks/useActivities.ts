import { useCallback, useEffect, useState } from "react";
import { Activity } from "../types/types";

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]); // Initialize as an empty array
  const [totalTimeSpent, setTotalTimeSpent] = useState(0); // Initialize as 0

  const getActivities = useCallback(() => {
    chrome.storage.local.get("activities", (result) => {
      const activities: Activity[] | undefined = result["activities"];

      if (!activities) {
        setActivities([]);
        return;
      }

      const totalTimeSpent = activities.reduce((acc, curr) => acc + curr.timeSpent, 0);

      setActivities(activities.sort((a, b) => b.timeSpent - a.timeSpent));
      setTotalTimeSpent(totalTimeSpent);
    });
  }, []);

  useEffect(() => {
    getActivities(); // Initial fetch
    chrome.storage.onChanged.addListener(getActivities); // Update on storage change

    // Cleanup listener on component unmount
    return () => chrome.storage.onChanged.removeListener(getActivities);
  }, [getActivities]);

  return { activities, totalTimeSpent };
}
