const thumbnailStyle = document.createElement("style");
// Thumbnail blurring functions
export function blurYtThumbnails(state: boolean) {
  if (state) {
    thumbnailStyle.textContent = `img.yt-core-image { filter: blur(50px) !important; }`;
    document.head.appendChild(thumbnailStyle);
  } else {
    thumbnailStyle.textContent = "";
    document.head.removeChild(thumbnailStyle);
  }
}
