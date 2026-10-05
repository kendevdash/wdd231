import { initializeSite } from "./main.js";

initializeSite();

const grid = document.querySelector("#credits-grid");
const loadingMessage = document.querySelector("#credits-loading");

async function loadCredits() {
  try {
    const response = await fetch("./data/image-credits.json");

    if (!response.ok) {
      throw new Error("The image credits could not be loaded.");
    }

    const credits = await response.json();

    loadingMessage.hidden = true;

    credits.forEach((credit) => {
      const card = document.createElement("article");

      card.className = "credit-card";

      card.innerHTML = `
        <img src="${credit.file}" alt="${credit.subject}" width="70" height="50" loading="lazy">
        <p class="credit-text">
          <strong>${credit.subject}</strong><br>
          Photo by ${credit.author}, ${credit.license}
          (<a href="${credit.source}" target="_blank" rel="noopener">source</a>)
        </p>
      `;

      grid.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    loadingMessage.textContent = "Sorry, the image credits could not be loaded.";
  }
}

loadCredits();
