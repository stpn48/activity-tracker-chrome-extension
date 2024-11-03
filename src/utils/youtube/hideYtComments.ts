const commentStyle = document.createElement("style");

export function hideYtComments(state: boolean) {
  if (state) {
    commentStyle.textContent = `ytd-comments { display: none !important; }`;
    document.head.appendChild(commentStyle);
  } else {
    commentStyle.textContent = "";
    document.head.removeChild(commentStyle);
  }
}
