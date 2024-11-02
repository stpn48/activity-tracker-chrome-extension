import { useActivities } from "../hooks/useActivities";
import { ActivityCard } from "./ActivityCard";
import { NavigationBar } from "./NavigationBar";

type Props = {};

export default function MainPage({}: Props) {
  const { activities } = useActivities();

  return (
    <div className="flex w-full flex-col gap-4 pb-16 font-geistSans text-sm text-white">
      {activities.length === 0 && (
        <p className="flex w-full justify-center text-xs text-stone-500">No activity today yet.</p>
      )}
      {activities.map((activity) => (
        <ActivityCard activity={activity} key={activity.id} />
      ))}
      <NavigationBar />
    </div>
  );
}
