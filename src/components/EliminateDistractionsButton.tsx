import { Link } from "react-router-dom";

export function EliminateDistractionsButton() {
  return (
    <Link className="flex text-center text-xs text-stone-500" to="/focus">
      Go to Focus Page
    </Link>
  );
}
