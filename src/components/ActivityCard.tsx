import { Link } from "react-router-dom";
import { Activity } from "../types/types";
import { formatTime } from "../utils/formatTime";

type Props = {
  activity: Activity;
};

export function ActivityCard({ activity }: Props) {
  return (
    <Link to={`/activity/${activity.id}`}>
      <div className="flex cursor-pointer items-center justify-between gap-2 rounded-full px-4 py-2 hover:bg-stone-600">
        <div className="flex items-center gap-4">
          <img
            width={24}
            className="rounded-full"
            height={24}
            src={activity.faviconUrl}
            alt="favicon"
          />
          <div>
            <h1 className="max-w-[150px] truncate"> {activity.title.replace(/^www\./, "")}</h1>
            <p className="text-xs text-stone-500">
              {activity.sessionCount} {activity.sessionCount === 1 ? "session" : "sessions"}
            </p>
          </div>
        </div>
        <h1 className="font-geistMono">{formatTime(activity.timeSpent)}</h1>
      </div>
    </Link>
  );
}
