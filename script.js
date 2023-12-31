function handleSearch(event) {
  event.preventDefault();

  // Get the value from the search input
  const searchTerm = document.getElementById("searchInput").value;
  document.getElementById("searchInput").value = "";

  fetchWeatherData(searchTerm);
}

function updateSearchHistory(searchTerm) {
  // Get the search history container
  const searchHistoryContainer = document.getElementById("searchHistory");

  // Create a new div element for the recent search
  const searchItem = document.createElement("div");
  searchItem.className =
    "search-item bg-secondary bg-gradient mt-3 fw-bold text-center py-2 rounded";
  searchItem.textContent = searchTerm;

  // Insert the new div at the beginning of the search history container
  searchHistoryContainer.insertBefore(
    searchItem,
    searchHistoryContainer.firstChild
  );
}

async function fetchWeatherData(cityName) {
  const apiKey = "6b113faae5c375b923daf36b5859653e";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    );
    const data = await response.json();

    if (data.cod === "200") {
      updateSearchHistory(cityName);
      displayWeatherInfo(data);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeatherInfo(data) {
  const weatherInfoContainer = document.getElementById("weatherInfo");
  weatherInfoContainer.innerHTML = ""; // Clear previous content

  const todayForecast = data.list[0];
  const weatherCondition = todayForecast.weather[0].description.toLowerCase();
  // Determine the icon based on weather condition
  const iconClass = getWeatherIcon(weatherCondition);
  const todayDate = new Date(todayForecast.dt_txt);
  const todayForecastInfo = document.createElement("div");
  todayForecastInfo.className = "border py-3 px-1";
  todayForecastInfo.innerHTML = `
  <div class="d-flex gap-3">
      <h2> ${
        data.city.name
      } (${todayDate.toLocaleDateString()})</h2><i class="${iconClass} fs-3"></i>
      </div>
      <p>Temp: ${todayForecast.main.temp} K</p>
      <p>Wind: ${todayForecast.wind.speed} m/s</p>
      <p>Humidity: ${todayForecast.main.humidity}%</p>
    `;
  weatherInfoContainer.appendChild(todayForecastInfo);

  // Display heading for 5-day forecast
  const forecastHeading = document.createElement("h2");
  forecastHeading.className = "pt-3";
  forecastHeading.textContent = "5-Day Forecast";
  weatherInfoContainer.appendChild(forecastHeading);

  // Filter the forecast data for the next 5 days
  const fiveDayForecast = data.list
    .filter((forecast, index) => index % 8 === 0 || index === 39)
    .slice(1, 6);

  const forecastCardContainer = document.createElement("div");
  forecastCardContainer.className = "row"; 

  fiveDayForecast.forEach((forecast) => {
    const date = new Date(forecast.dt_txt);
    const formattedDate = date.toLocaleDateString();

    const weatherCondition = forecast.weather[0].description.toLowerCase();

    // Determine the icon based on weather condition
    let iconClass = getWeatherIcon(weatherCondition);

    const forecastCard = document.createElement("div");
    forecastCard.className = "col-md-2 mb-3";
    forecastCard.innerHTML = `
    <div class="card forecast-card">
      <div class="card-body text-white" style="background-color: #343a40;">
        <h5 class="card-title">${formattedDate}</h5>
        <i class="${iconClass} fs-3"></i>
        <p class="card-text">Temp: ${forecast.main.temp} K</p>
        <p class="card-text">Wind: ${forecast.wind.speed} m/s</p>
        <p class="card-text">Humidity: ${forecast.main.humidity}%</p>
      </div>
    </div>
  `;
    forecastCardContainer.appendChild(forecastCard);
  });

  weatherInfoContainer.appendChild(forecastCardContainer);
}

function getWeatherIcon(weatherCondition) {
  let iconClass = "";

  if (weatherCondition.includes("clear")) {
    iconClass = "bi bi-sun"; // Clear sky
  } else if (weatherCondition.includes("clouds")) {
    iconClass = "bi bi-cloud"; // Cloudy
  } else if (weatherCondition.includes("rain")) {
    iconClass = "bi bi-cloud-rain"; // Rainy
  } else if (weatherCondition.includes("snow")) {
    iconClass = "bi bi-snow"; // Snowy
  } else if (weatherCondition.includes("thunderstorm")) {
    iconClass = "bi bi-lightning"; // Thunderstorm
  } else if (weatherCondition.includes("drizzle")) {
    iconClass = "bi bi-cloud-drizzle"; // Drizzle
  } else if (
    weatherCondition.includes("mist") ||
    weatherCondition.includes("fog")
  ) {
    iconClass = "bi bi-fog"; // Mist or fog
  } else {
    iconClass = "bi bi-question"; 
    // Default question mark icon for unknown conditions
  }

  return iconClass;
}