export function getLeadErrorMessage(error) {
  if (error.name === "TimeoutError" || error.name === "AbortError") {
    return "The submission timed out. Please check your connection and try again.";
  }
  if (error.name === "TypeError") {
    return "Unable to reach the website. Please check your internet connection and try again.";
  }
  return error.message || "Unable to submit the form. Please try again.";
}
