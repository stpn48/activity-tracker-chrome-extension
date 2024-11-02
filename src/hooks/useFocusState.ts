import { useEffect, useState } from "react";

type FocusState = {
  blurYoutubeThumbnails: boolean;
  hideYoutubeComments: boolean;
  hideYoutubeShorts: boolean;
  blockYoutube: boolean;
};

const defaultFocusState: FocusState = {
  blurYoutubeThumbnails: false,
  hideYoutubeComments: false,
  hideYoutubeShorts: false,
  blockYoutube: false,
};

export function useFocusState() {
  const [focusState, setFocusState] = useState<FocusState>(defaultFocusState);

  useEffect(() => {
    chrome.storage.local.get("focusState", (result) => {
      const storedFocusState = result["focusState"] || defaultFocusState;
      setFocusState(storedFocusState);
    });
  }, []);

  const updateFocusState = (newState: Partial<FocusState>) => {
    const updatedState = { ...focusState, ...newState };
    setFocusState(updatedState);
    chrome.storage.local.set({ focusState: updatedState });
  };

  return {
    focusState,
    updateFocusState,
  };
}
