import { useCallback, useEffect, useState } from "react";
import "./App.css";

type Activity = {
  timeSpent: number;
  title: string;
  url: string;
  faviconUrl: string;
};

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); // Initialize as an empty array

  const getActivities = useCallback(() => {
    chrome.storage.local.get(null, (result) => {
      const localStorage = result as { [title: string]: Activity };
      setActivities(Object.values(localStorage));
    });
  }, [chrome, setActivities]);

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  return (
    <div className="flex flex-col gap-2 rounded-lg w-[600px] bg-[#131313] p-4 text-white">
      {activities.map((activity, index) => (
        <div className="flex gap-2 items-center" key={index}>
          <img width={24} className="rounded-full" height={24} src={activity.faviconUrl} alt="favicon" />
          <h1>{activity.title}</h1>
          <h1>{activity.timeSpent} Seconds</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
