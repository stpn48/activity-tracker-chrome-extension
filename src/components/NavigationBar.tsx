import { useActivities } from "../hooks/useActivities";
import { formatTime } from "../utils/formatTime";
import { EliminateDistractionsButton } from "./EliminateDistractionsButton";

export function NavigationBar() {
  const { totalTimeSpent } = useActivities();

  return (
    <div className="fixed bottom-0 right-0 flex w-full items-center justify-between rounded-t-lg bg-[#131313] px-8 py-6">
      <div className="flex flex-col items-center">
        <p className="text-xs text-stone-500">total</p>
        <p className="font-geistMono text-blue-600">{formatTime(totalTimeSpent)}</p>
      </div>
      <EliminateDistractionsButton />
    </div>
  );
}
