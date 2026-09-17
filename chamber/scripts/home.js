// ==========================================================================
//  Provo Valley Chamber of Commerce – home.js
// ==========================================================================

const MEMBERSHIP_LABELS = { 1: "Member", 2: "Silver Member", 3: "Gold Member" };

// --- Weather: OpenWeatherMap (Current Weather + 5 day / 3 hour Forecast) --
const WEATHER_API_KEY = "f454328b513b327b1a704996a7f61d64";
const PROVO_LAT = 40.2338;
const PROVO_LON = -111.6585;

const weatherNowEl = document.querySelector("#weather-now");
const forecastEl = document.querySelector("#forecast");

async function getCurrentWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${PROVO_LAT}&lon=${PROVO_LON}&units=imperial&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    weatherNowEl.innerHTML = "<p class=\"loading\">Current conditions are unavailable right now.</p>";
    console.error("Unable to load current weather:", error);
  }
}

function displayCurrentWeather(data) {
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  const temp = Math.round(data.main.temp);

  weatherNowEl.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" width="64" height="64">
    <div>
      <p class="weather-temp">${temp}&deg;F</p>
      <p class="weather-desc">${description}</p>
    </div>
  `;
}

async function getForecast() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${PROVO_LAT}&lon=${PROVO_LON}&units=imperial&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Forecast request failed: ${response.status}`);
    const data = await response.json();
    displayForecast(data.list);
  } catch (error) {
    forecastEl.innerHTML = "<p class=\"loading\">Forecast is unavailable right now.</p>";
    console.error("Unable to load forecast:", error);
  }
}

// The free 5 day / 3-hour endpoint has no daily summary, so pick the
// slot nearest midday for each of the next 3 distinct calendar dates.
function displayForecast(list) {
  const today = new Date().toDateString();
  const dayLabel = new Intl.DateTimeFormat("en-US", { weekday: "short" });
  const seenDates = new Set([today]);
  const days = [];

  for (const entry of list) {
    const entryDate = new Date(entry.dt * 1000);
    const dateKey = entryDate.toDateString();
    const hour = entryDate.getHours();

    if (seenDates.has(dateKey)) continue;
    if (hour < 11 || hour > 14) continue;

    seenDates.add(dateKey);
    days.push({ date: entryDate, icon: entry.weather[0].icon, temp: Math.round(entry.main.temp) });

    if (days.length === 3) break;
  }

  forecastEl.innerHTML = days
    .map(
      (day) => `
        <div class="forecast-day">
          <p class="day-label">${dayLabel.format(day.date)}</p>
          <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="" width="40" height="40">
          <p class="day-temp">${day.temp}&deg;F</p>
        </div>
      `
    )
    .join("");
}

if (WEATHER_API_KEY && WEATHER_API_KEY !== "REPLACE_WITH_YOUR_OPENWEATHERMAP_KEY") {
  getCurrentWeather();
  getForecast();
} else {
  const message = "<p class=\"loading\">Weather is not configured yet.</p>";
  weatherNowEl.innerHTML = message;
  forecastEl.innerHTML = message;
}

// --- Spotlights: random gold/silver members from data/members.json -------
const spotlightsEl = document.querySelector("#spotlights");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    const eligible = members.filter((member) => member.membership === 2 || member.membership === 3);
    const count = Math.min(eligible.length, Math.random() < 0.5 ? 2 : 3);
    const chosen = shuffle(eligible).slice(0, count);
    displaySpotlights(chosen);
  } catch (error) {
    spotlightsEl.innerHTML = "<p class=\"loading\">Sorry, member spotlights could not be loaded right now.</p>";
    console.error("Unable to load data/members.json:", error);
  }
}

function displaySpotlights(members) {
  spotlightsEl.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.className = "member-card";

    const label = MEMBERSHIP_LABELS[member.membership] || "Member";
    const telHref = `+1${member.phone.replace(/\D/g, "")}`;

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" width="240" height="160" loading="lazy">
      <div class="member-body">
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p><a href="tel:${telHref}">${member.phone}</a></p>
        <a class="member-link" href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        <span class="badge badge-${member.membership}">${label}</span>
      </div>
    `;

    spotlightsEl.appendChild(card);
  });
}

getSpotlights();

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

// --- Footer: dynamic copyright year and last modified date ----------------
document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  `Last Modification: ${document.lastModified}`;
