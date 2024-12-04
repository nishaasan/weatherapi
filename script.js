document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    const city = document.getElementById('city').value;
    const apiKey = 'ba232a630c9c58ba0b0c3b4287dc9fb3';
  
    // Step 1: Get latitude and longitude using OpenWeatherMap Geocoding API
    const geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    fetch(geoApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        // Step 2: Get the lat and lon from the geocoding API response
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        
        // Step 3: Construct the API URL for the weather data using lat and lon
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        
        // Fetch weather data using the lat and lon
        return fetch(weatherApiUrl);
      })
      .then(response => response.json())
      .then(data => {
        // Step 4: Extract weather data and display it
        const cityName = data.name;
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
  
        // Displaying the data in the DOM
        document.getElementById('city-name').textContent = `Weather in ${cityName}`;
        document.getElementById('temperature').textContent = `${temp}°C`;
        document.getElementById('description').textContent = description;
        document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
      })
      .catch(error => {
        console.error('Error:', error);
        alert('City not found or invalid API call');
      });
  });
  