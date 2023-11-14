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
  }