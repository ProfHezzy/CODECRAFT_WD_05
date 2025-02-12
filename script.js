const apiKey = "ec38b36f27a011e4e07c055414f64c8e";  // API Key

document.getElementById("getWeatherBtn").addEventListener("click", getWeatherByLocation);

function getWeatherByLocation() {
    const location = document.getElementById('location').value.trim();
    console.log("Location entered:", location);

    if (location === "") {
        alert("Please enter a location.");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);
            if (data.cod === "404") {
                alert("Location not found.");
                return;
            }
            displayWeatherData(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function displayWeatherData(data) {
    document.getElementById('city').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Set Weather Icon
    const iconMap = {
        "01d": "fas fa-sun",       // Clear sky day
        "01n": "fas fa-moon",      // Clear sky night
        "02d": "fas fa-cloud-sun", // Few clouds day
        "02n": "fas fa-cloud-moon",// Few clouds night
        "03d": "fas fa-cloud",     // Scattered clouds
        "03n": "fas fa-cloud",
        "04d": "fas fa-cloud-meatball", // Broken clouds
        "04n": "fas fa-cloud-meatball",
        "09d": "fas fa-cloud-showers-heavy", // Shower rain
        "09n": "fas fa-cloud-showers-heavy",
        "10d": "fas fa-cloud-rain", // Rain
        "10n": "fas fa-cloud-rain",
        "11d": "fas fa-bolt",      // Thunderstorm
        "11n": "fas fa-bolt",
        "13d": "fas fa-snowflake", // Snow
        "13n": "fas fa-snowflake",
        "50d": "fas fa-smog",      // Mist
        "50n": "fas fa-smog"
    };

    const iconCode = data.weather[0].icon;
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.className = iconMap[iconCode] || "fas fa-question-circle";
    weatherIcon.style.display = "block"; // Make icon visible

    // Add fade-in animation
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = "0"; 
        setTimeout(() => element.style.opacity = "1", 100);
    });
}