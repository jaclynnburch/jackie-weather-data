function handleSearch(event) {
    event.preventDefault();
  
    // Get the value from the search input
    const searchTerm = document.getElementById("searchInput").value;
    document.getElementById("searchInput").value = "";
  
    fetchWeatherData(searchTerm);
  }
  function updateSearchHistory(searchTerm) {
    /// Get the search history container
    const updateSearchHistoryContainer = document.getElemeentByID("searchHistory");

    // Create a new div element for the recent search
    const searchItem = document.createElement("div");
    searchItem.className = "search-item bg-gradient mt-3 fw-bold text-center py-2 rounded";
    searchItem.textContent = searchTerm;

    // Inset the new div at the beginning of the search history container
    searchHisrtoryContainer.insertBefore(
        searchItem,
        SearchHistoryContainer.firstChild
    );
  }

  async function fetchWeatherData(cityName) {
    const apiKey = "6b113faae5c375b923daf36b5859653e"

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
        );
        const data = await response.json();

        if (data.cod === "200") {
            updateSearchHistory(cityName);
            displyaWeatherInfo(data);
        }
    } catch (error) {

    }
}

function displyaWeatherInfo(data) {
    const weatherInfoContainer = document.getElemeentByID("weatherInfo");
    weatherInfoContainer.innerHTML = ""; // Clear previous content

    const todayForecast = data.list [0];
    const weatherCondition = todayForecast.weather[0].description.toLowerCase();

    // Determine the icon based on weather condition
const iconClass = getWeatherIcon(weatherCondition);
const todayDate = new Date(todayForecast.dt_txt);
const todayForecastInfo = document.createElement("div");
todayForecastInfo.className = "border py-3 px-1";
todayForecastInfo.innerHTML = `
<div class ="d-flex gap-3">
    <h2> ${
        data.city.name
    } (${todayDate.toLocaleDateString()})</h2><i class="${iconClass} fs-3"></i>
    </div>
    <p>Temp: ${todayForecast.main.temp} K</p>
<p>Wind: ${todayForecast.wind.speed} m/s</p>`;

weatherInfoContainer.appendChild(todayForecastInfo);

// Display heading for 5-day forecast
const forecastHeading = document.createElement("h2");
forecastHeading.className = "pt-3";
forecastHeading.textContent= "5-Day Forecast";
weatherInfoContainer.appendChild(forecastHeading);

//Filter the forecast data for the next 5 days
const fiveDayForecast = data.list
.filter((forecast, index) => index % 8 === 0 || index === 39)
.slice(1, 6);




}