import { initializeSite } from "./main.js";

initializeSite();

const list = document.querySelector("#attractions-list");
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");
const filter = document.querySelector("#category-filter");

const dialog = document.querySelector("#attraction-dialog");
const closeDialog = document.querySelector("#close-dialog");

const dialogTitle = document.querySelector("#dialog-title");
const dialogRegion = document.querySelector("#dialog-region");
const dialogType = document.querySelector("#dialog-type");
const dialogLocation = document.querySelector("#dialog-location");
const dialogDescription = document.querySelector("#dialog-description");

const favoriteButton = document.querySelector("#favorite-button");

let attractions = [];
let selectedAttraction = null;

async function getAttractions() {
  try {
    const response = await fetch("./data/attractions.json");

    if (!response.ok) {
      throw new Error("The attraction data could not be loaded.");
    }

    attractions = await response.json();

    loadingMessage.hidden = true;

    displayAttractions(attractions);
  } catch (error) {
    console.error(error);

    loadingMessage.hidden = true;
    errorMessage.hidden = false;

    errorMessage.textContent =
      "Sorry, we could not load the attraction information. Please try again later.";
  }
}

function displayAttractions(items) {
  list.innerHTML = "";

  if (items.length === 0) {
    list.textContent = "No attractions were found.";
    return;
  }

  items.forEach((attraction, index) => {
    const card = document.createElement("article");

    card.className = "attraction-card";

    card.innerHTML = `
      <img
        src="${attraction.image}"
        alt="${attraction.name}"
        width="480"
        height="320"
        loading="lazy"
      >

      <div class="card-content">
        <div class="card-number">${String(index + 1).padStart(2, "0")}</div>
        <p class="card-type">${attraction.type}</p>

        <h2>${attraction.name}</h2>

        <p><strong>Region:</strong> ${attraction.region}</p>
        <p><strong>Location:</strong> ${attraction.location}</p>
        <p>${attraction.description}</p>

        <button class="details-button" type="button" data-name="${attraction.name}">
          Learn More
        </button>
      </div>
    `;

    const detailsButton = card.querySelector(".details-button");

    detailsButton.addEventListener("click", () => {
      openAttractionDialog(attraction);
    });

    list.appendChild(card);
  });
}

function openAttractionDialog(attraction) {
  selectedAttraction = attraction;

  dialogTitle.textContent = attraction.name;
  dialogRegion.textContent = `Region: ${attraction.region}`;
  dialogType.textContent = `Type: ${attraction.type}`;
  dialogLocation.textContent = `Location: ${attraction.location}`;
  dialogDescription.textContent = attraction.description;

  updateFavoriteButton();

  dialog.showModal();
}

function updateFavoriteButton() {
  const saved = localStorage.getItem("favoriteAttraction");

  if (selectedAttraction && saved === selectedAttraction.name) {
    favoriteButton.textContent = "Remove Favorite";
  } else {
    favoriteButton.textContent = "Save as Favorite";
  }
}

favoriteButton.addEventListener("click", () => {
  if (!selectedAttraction) {
    return;
  }

  const saved = localStorage.getItem("favoriteAttraction");

  if (saved === selectedAttraction.name) {
    localStorage.removeItem("favoriteAttraction");
  } else {
    localStorage.setItem("favoriteAttraction", selectedAttraction.name);
  }

  updateFavoriteButton();
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  const dialogDimensions = dialog.getBoundingClientRect();

  if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
});

filter.addEventListener("change", () => {
  const selectedCategory = filter.value;

  if (selectedCategory === "all") {
    displayAttractions(attractions);
    return;
  }

  const filteredAttractions = attractions.filter(
    (attraction) => attraction.type === selectedCategory
  );

  displayAttractions(filteredAttractions);
});

getAttractions();
