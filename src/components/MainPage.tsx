import { Link } from "react-router-dom";
import { useActivities } from "../hooks/useActivities";
import { formatTime } from "../utils/formatTime";
import { ActivityCard } from "./ActivityCard";

type Props = {};

export default function MainPage({}: Props) {
  const { activities, totalTimeSpent } = useActivities();

  return (
    <div className="flex font-geistSans flex-col gap-4 text-sm  text-white">
      {activities.map((activity) => (
        <ActivityCard activity={activity} key={activity.id} />
      ))}
      <div className="flex flex-col w-full mt-4 items-center">
        <p className="text-blue-600 font-geistMono">{formatTime(totalTimeSpent)}</p>
      </div>
      <Link to={"/focus"}>Go to focus page</Link>
    </div>
  );
}
