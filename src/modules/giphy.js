const GIPHY_API_KEY = "7hOvll3XDu1kqUu93k0dUM5O8IHoZaXN";

export async function fetchWeatherGif(query) {
  const encoded = encodeURIComponent(query);
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${encoded}`,
    { mode: "cors" }
  );

  const data = await response.json();
  return data.data?.images?.downsized_medium?.url || null;
}
