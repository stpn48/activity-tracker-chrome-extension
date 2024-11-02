export function hideYtComments(state: boolean) {
  const commentsContainer = document.querySelectorAll("ytd-comments");

  commentsContainer.forEach((container) => {
    if (state) {
      // Hide comments
      (container as HTMLElement).style.display = "none";
    } else {
      // Show comments
      (container as HTMLElement).style.display = "";
    }
  });
}
