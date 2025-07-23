import "./styles.css";
import { fetchWeather, processWeatherData } from "./modules/api";
import { fetchWeatherGif } from "./modules/giphy";

const form = document.getElementById("weather-form");
const input = document.getElementById("location-input");
const display = document.getElementById("weather-display");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = input.value.trim();
  if (!location) return;

  display.textContent = "Loading...";

  const isFarenheit = document.getElementById("unit-toggle").checked;
  const unit = isFarenheit ? "us" : "metric";
  const unitSymbol = isFarenheit ? "°F" : "°C";

  try {
    const data = await fetchWeather(location, unit);
    const forecast = processWeatherData(data);
    displayWeather(forecast, unitSymbol);
  } catch (err) {
    display.textContent = "Error fetching weather data.";
    console.error(err);
  }
});

async function displayWeather(forecastArray, unitSymbol) {
  display.innerHTML = "";

  for (const day of forecastArray) {
    const gifUrl = await fetchWeatherGif(day.desc);
    const dayEl = document.createElement("div");
    dayEl.classList.add("weather-day");
    dayEl.innerHTML = `
        <h3>${day.date}</h3>
        <img src="${gifUrl}" alt="${day.desc}" style="width: 100%; border-radius: 8px; margin-bottom: 0.5rem;">
        <p>${day.desc}</p>
        <p>Temp: ${day.temp}${unitSymbol}</p>
        <p>Feels Like: ${day.feelsLike}${unitSymbol}</p>
    `;
    display.appendChild(dayEl);
  }
}
