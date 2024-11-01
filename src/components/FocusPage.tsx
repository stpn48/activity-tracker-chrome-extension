import { ToggleButton } from "./ToggleButton";

type Props = {};

export function FocusPage({}: Props) {
  return (
    <div className="">
      <div className="flex justify-between">
        <h1>Blur Youtube Thumbnails</h1>
        <ToggleButton />
      </div>
    </div>
  );
}
