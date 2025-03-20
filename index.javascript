// app.js

const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Function to fetch weather data
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === '404') {
      alert('City not found');
    } else {
      cityName.textContent = `${data.name}, ${data.sys.country}`;
      temperature.textContent = `Temperature: ${data.main.temp} °C`;
      description.textContent = `Description: ${data.weather[0].description}`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      weatherInfo.style.display = 'block';
    }
  } catch (error) {
    console.log(error);
    alert('Error fetching weather data');
  }
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name');
  }
});

// Optionally, you can add a keypress event for the Enter key
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value;
    if (city) {
      fetchWeather(city);
    }
  }
});
