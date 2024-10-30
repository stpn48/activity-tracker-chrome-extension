import { useCallback, useEffect, useState } from "react";
import { formatTime } from "./utils/formatTime";

type Activity = {
  timeSpent: number;
  title: string;
  url: string;
  faviconUrl: string;
};

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); // Initialize as an empty array
  const [totalTimeSpent, setTotalTimeSpent] = useState(0); // Initialize as 0

  const getActivities = useCallback(() => {
    chrome.storage.local.get(null, (result) => {
      const localStorage = result as { [title: string]: Activity };
      setActivities(Object.values(localStorage).sort((a, b) => b.timeSpent - a.timeSpent)); // Sort by timeSpent in descending order
      setTotalTimeSpent(Object.values(localStorage).reduce((acc, curr) => acc + curr.timeSpent, 0));
    });
  }, []);

  useEffect(() => {
    getActivities(); // Initial fetch
    chrome.storage.onChanged.addListener(getActivities); // Update on storage change

    // Cleanup listener on component unmount
    return () => chrome.storage.onChanged.removeListener(getActivities);
  }, [getActivities]);

  return (
    <div className="flex flex-col gap-4 w-[400px] bg-[#131313] p-4 text-white">
      <h1>Total Time Spent Today: {formatTime(totalTimeSpent)}</h1>
      {activities.map((activity, index) => (
        <div className="flex gap-2 justify-between items-center" key={index}>
          <div className="flex items-center gap-4">
            <img width={24} className="rounded-full" height={24} src={activity.faviconUrl} alt="favicon" />
            <h1>{activity.title}</h1>
          </div>
          <h1>{formatTime(activity.timeSpent)}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
