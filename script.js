const apiKey = "c6b1d79f0a94157bbebe0491b98873b7"; // Your OpenWeather API key

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherBox = document.getElementById("weatherResult");
  const errorText = document.getElementById("error");

  weatherBox.classList.add("hidden");
  errorText.textContent = "";

  if (!city) {
    errorText.textContent = "Please enter a city name.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    weatherBox.innerHTML = `
      <h2>${data.name}</h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      <p><strong>${data.weather[0].description}</strong></p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
    `;
    weatherBox.classList.remove("hidden");
  } catch (error) {
    errorText.textContent = error.message;
  }
}

// 🌙 Toggle Dark/Light Mode
const toggle = document.getElementById("themeToggle");
const body = document.body;
const modeLabel = document.getElementById("modeLabel");

toggle.addEventListener("change", () => {
  body.classList.toggle("dark");
  modeLabel.textContent = toggle.checked ? "Dark Mode" : "Light Mode";
});
