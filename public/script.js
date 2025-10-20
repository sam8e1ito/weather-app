const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherDiv = document.getElementById("weather");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  getWeather(city);
});

async function getWeather(city) {
  try {
    const response = await fetch(`/api/weather?city=${city}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const cityName = data.name;

    weatherDiv.innerHTML = `
      <h2>${cityName}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
      <p>${description}</p>
      <p><strong>${temp}°C</strong></p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = `<p>${error.message}</p>`;
  }
}
