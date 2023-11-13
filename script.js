function handleSearch(event) {
    event.preventDefault();
  
    // Get the value from the search input
    const searchTerm = document.getElementById("searchInput").value;
    document.getElementById("searchInput").value = "";
  
    fetchWeatherData(searchTerm);
  }