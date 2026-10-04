// ==========================================================================
//  Provo Valley Chamber of Commerce – discover.js
// ==========================================================================

import { discoverItems } from "../data/discover.mjs";

// --- Render the discover cards ---------------------------------------------
const discoverGrid = document.querySelector("#discover-grid");

function displayDiscoverItems(items) {
  discoverGrid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button">Learn More</button>
    `;

    discoverGrid.appendChild(card);
  });
}

displayDiscoverItems(discoverItems);

// --- Visitor message, tracked in localStorage ------------------------------
const visitMessage = document.querySelector("#visit-message");
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const days = Math.floor((now - Number(lastVisit)) / millisecondsPerDay);

  if (days < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    visitMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitMessage.textContent = `You last visited ${days} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);

// --- Mobile hamburger navigation -------------------------------------------
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menuButton.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

navigation.addEventListener("click", (event) => {
  if (event.target.matches("a") && navigation.classList.contains("open")) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.innerHTML = "&#9776;";
  }
});

// --- Footer: dynamic copyright year and last modified date -----------------
document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  `Last Modification: ${document.lastModified}`;
