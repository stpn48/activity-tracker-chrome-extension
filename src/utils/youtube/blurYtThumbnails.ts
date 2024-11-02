const style = document.createElement("style");
// Thumbnail blurring functions
export function blurYtThumbnails(state: boolean) {
  if (state) {
    style.textContent = `img.yt-core-image { filter: blur(50px) !important; }`;
    document.head.appendChild(style);
  } else {
    style.textContent = "";
    document.head.removeChild(style);
  }
}
