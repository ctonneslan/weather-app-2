import "./styles.css";
import { fetchWeather, processWeatherData } from "./modules/api";

const form = document.getElementById("weather-form");
const input = document.getElementById("location-input");
const display = document.getElementById("weather-display");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = input.value.trim();
  if (!location) return;

  display.textContent = "Loading...";

  try {
    const data = await fetchWeather(location);
    const weather = processWeatherData(data);
    displayWeather(weather);
  } catch (err) {
    display.textContent = "Error fetching weather data.";
    console.error(err);
  }
});

function displayWeather(forecastArray) {
  display.innerHTML = "";

  forecastArray.forEach((day) => {
    const dayEl = document.createElement("div");
    dayEl.classList.add("weather-day");
    dayEl.innerHTML = `
        <h3>${day.date}</h3>
        <p>${day.desc}</p>
        <p>Temp: ${day.temp}°C</p>
        <p>Feels Like: ${day.feelsLike}°C</p>
    `;
    display.appendChild(dayEl);
  });
}
