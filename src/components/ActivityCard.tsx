import { Activity } from "../types/types";
import { formatTime } from "../utils/formatTime";

type Props = {
  activity: Activity;
};

export function ActivityCard({ activity }: Props) {
  return (
    <div className="flex px-4 rounded-full cursor-pointer py-2 hover:bg-stone-600 gap-2 justify-between items-center">
      <div className="flex items-center gap-4">
        <img width={24} className="rounded-full" height={24} src={activity.faviconUrl} alt="favicon" />
        <div>
          <h1 className="truncate max-w-[150px]"> {activity.title.replace(/^www\./, "")}</h1>
          <p className="text-xs text-stone-500">
            {activity.sessionCount} {activity.sessionCount === 1 ? "session" : "sessions"}
          </p>
        </div>
      </div>
      <h1 className="font-geistMono">{formatTime(activity.timeSpent)}</h1>
    </div>
  );
}
