const API_KEY = "8WHFUGV7QVK48L8S39BDXZ26Y";

export async function fetchWeather(location) {
  const encodedLocation = encodeURIComponent(location);
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?unitGroup=metric&key=${API_KEY}&contentType=json`
  );
  if (!response.ok) throw new Error("Location not found.");
  return response.json();
}

export function processWeatherData(data) {
  return data.days.slice(0, 7).map((day) => ({
    date: day.datetime,
    tmep: day.temp,
    feelsLike: day.feelslike,
    desc: day.conditions,
  }));
}
