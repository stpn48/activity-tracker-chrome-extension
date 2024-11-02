import { useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onClick?: () => void;
};

export function ToggleButton({ onClick }: Props) {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <button
      className={twMerge(
        "flex h-6 w-10 items-center rounded-full bg-stone-800 transition-all duration-300",
        isToggled ? "bg-stone-700" : "bg-stone-800",
      )}
      onClick={() => {
        setIsToggled((prev) => !prev);

        if (onClick) onClick();
      }}
    >
      <div
        className={twMerge(
          "size-5 rounded-full bg-blue-600 transition-all duration-200",
          isToggled ? "translate-x-5" : "translate-x-0",
        )}
      ></div>
    </button>
  );
}
