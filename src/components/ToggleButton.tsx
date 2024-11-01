import { useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onClick?: () => void;
};

export function ToggleButton({ onClick }: Props) {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <button
      className={twMerge("rounded-full flex items-center w-10 h-4 bg-stone-800")}
      onClick={() => {
        setIsToggled((prev) => !prev);

        if (onClick) onClick();
      }}
    >
      <div className={twMerge("transition-all rounded-full size-5 bg-blue-600 duration-300", isToggled ? "translate-x-5" : "translate-x-0")}></div>
    </button>
  );
}
