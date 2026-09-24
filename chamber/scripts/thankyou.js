// ==========================================================================
//  Provo Valley Chamber of Commerce – thankyou.js
// ==========================================================================

// The join form submits with method="get", so the entered values arrive
// here as URL query parameters instead of needing a server.
const params = new URLSearchParams(window.location.search);

const fields = ["firstName", "lastName", "email", "phone", "businessName", "timestamp"];

fields.forEach((field) => {
  const output = document.getElementById(`out-${field}`);
  output.textContent = params.get(field) || "Not provided";
});

// --- Mobile hamburger navigation -------------------------------------------
const menuButton = document.getElementById("menu-button");
const navList = document.getElementById("primary-nav");

menuButton.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menuButton.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

navList.addEventListener("click", (event) => {
  if (event.target.matches("a") && navList.classList.contains("open")) {
    navList.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.innerHTML = "&#9776;";
  }
});

// --- Footer: dynamic copyright year and last modified date ----------------
document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent =
  `Last Modification: ${document.lastModified}`;
