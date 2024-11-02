import { Switch } from "@/components/ui/switch";
import { useFocusState } from "@/hooks/useFocusState";
import { Link } from "react-router-dom";

type Props = {};

export function FocusPage({}: Props) {
  const { focusState, updateFocusState } = useFocusState();

  return (
    <div className="flex w-full flex-col gap-4 text-sm">
      <div className="flex justify-between">
        <h1>Blur Youtube Thumbnails</h1>
        <Switch
          checked={focusState.blurYoutubeThumbnails}
          onClick={() =>
            updateFocusState({ blurYoutubeThumbnails: !focusState.blurYoutubeThumbnails })
          }
        />
      </div>
      <div className="flex justify-between">
        <h1>Hide Youtube Comments</h1>
        <Switch
          checked={focusState.hideYoutubeComments}
          onClick={() => updateFocusState({ hideYoutubeComments: !focusState.hideYoutubeComments })}
        />
      </div>
      <div className="flex justify-between">
        <h1>Hide Youtube Shorts </h1>
        <Switch
          checked={focusState.hideYoutubeShorts}
          onClick={() => updateFocusState({ hideYoutubeShorts: !focusState.hideYoutubeShorts })}
        />
      </div>
      <div className="flex justify-between">
        <h1>Block Youtube</h1>
        <Switch
          checked={focusState.blockYoutube}
          onClick={() => updateFocusState({ blockYoutube: !focusState.blockYoutube })}
        />
      </div>
      <Link className="text-xs text-stone-500" to="/">
        Go Back
      </Link>
    </div>
  );
}
