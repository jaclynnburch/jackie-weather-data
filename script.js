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
}