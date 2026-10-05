import { initializeSite } from "./main.js";

initializeSite();

function showSubmittedValue(id, value) {
  const element = document.querySelector(id);

  if (element) {
    element.textContent = value || "Not provided";
  }
}

if (document.querySelector("#submitted-name")) {
  const params = new URLSearchParams(window.location.search);

  showSubmittedValue("#submitted-name", params.get("name"));
  showSubmittedValue("#submitted-email", params.get("email"));
  showSubmittedValue("#submitted-interest", params.get("interest"));
  showSubmittedValue("#submitted-message", params.get("message"));
}
