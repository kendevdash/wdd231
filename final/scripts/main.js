export function setupNavigation() {
  const menuButton = document.querySelector("#menu-button");
  const navigation = document.querySelector("#navigation");

  if (!menuButton || !navigation) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✕" : "☰";
  });
}

export function updateFooter() {
  const year = document.querySelector("#current-year");
  const modified = document.querySelector("#last-modified");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (modified) {
    modified.textContent = document.lastModified;
  }
}

export function initializeSite() {
  setupNavigation();
  updateFooter();
}
