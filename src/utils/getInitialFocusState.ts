import { blurYtThumbnails } from "./youtube/blurYtThumbnails";
import { hideYtComments } from "./youtube/hideYtComments";

export function getInitialFocusState() {
  chrome.storage.local.get("focusState", (result) => {
    if (result.focusState.blurYoutubeThumbnails) {
      console.log("Blurring thumbnails initially");
      blurYtThumbnails(true);
    }

    if (result.focusState.hideYoutubeComments) {
      console.log("Hiding comments initially");
      hideYtComments(true);
    }
  });
}
