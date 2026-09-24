// ==========================================================================
//  Provo Valley Chamber of Commerce – join.js
// ==========================================================================

// --- Hidden timestamp: records when the form was loaded -------------------
document.getElementById("timestamp").value = new Date().toString();

// --- Membership benefit modals ---------------------------------------------
document.querySelectorAll("[data-modal-target]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    document.getElementById(trigger.dataset.modalTarget).showModal();
  });
});

document.querySelectorAll(".modal-close").forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    closeButton.closest("dialog").close();
  });
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
