// Footer: dynamic copyright year and last-modified date.
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent =
  `Last Modified: ${document.lastModified}`;
