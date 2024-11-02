import {
  incrementSessionCount,
  sendActivityData,
  startTracking,
  stopTracking,
} from "@/utils/trackTimeSpent";
import { getInitialFocusState } from "./getInitialFocusState";

export function initPageListeners() {
  // ON page load
  window.addEventListener("load", () => {
    sendActivityData();
    getInitialFocusState();
    incrementSessionCount(1);
    startTracking();
  });

  // On page unload
  window.addEventListener("beforeunload", stopTracking);

  // On page visibility change
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      incrementSessionCount(1);
      startTracking();
      return;
    }

    if (document.visibilityState === "hidden") {
      stopTracking();
      return;
    }
  });
}
