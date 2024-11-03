import { getActivity } from "@/utils/getActivity";
import { Link, useParams } from "react-router-dom";
import { ActivityChart } from "./ActivityChart";

export function ActivityPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>No activity found</div>;
  }

  const activity = getActivity(id);

  if (!activity) {
    return <div>Activity not found</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2">
        <img src={activity.faviconUrl} alt="favicon" className="h-[24px] w-[24px] rounded-full" />
        <h1>{activity.title.replace(/^www\./, "")}</h1>
      </div>
      <h1 className="flex w-full justify-center">Activity Today</h1>
      <ActivityChart hourlyTimeSpent={activity.hourlyTimeSpent} />
      <Link className="text-xs text-stone-500" to="/">
        Go back
      </Link>
    </div>
  );
}
