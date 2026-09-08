// Responsive navigation: toggle the menu open/closed on small screens.
const menuToggle = document.getElementById("menu-toggle");
const primaryNav = document.getElementById("primary-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

// Close the menu after choosing a link (small screens).
primaryNav.addEventListener("click", (event) => {
  if (event.target.matches("a") && primaryNav.classList.contains("open")) {
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }
});
