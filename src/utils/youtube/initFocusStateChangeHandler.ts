import { hideYtComments } from "@/utils/youtube/hideYtComments";
import { blurYtThumbnails } from "./blurYtThumbnails";

export function initFocusStateChangeHandler() {
  chrome.storage.local.onChanged.addListener((changes) => {
    const newFocusState = changes.focusState?.newValue;

    console.log("newFocusState", newFocusState);
    if (!newFocusState) {
      console.log("No new focus state");
      return;
    }

    blurYtThumbnails(newFocusState.blurYoutubeThumbnails);
    hideYtComments(newFocusState.hideYoutubeComments);
  });
}
