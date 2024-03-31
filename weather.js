
const API_KEY = '2fa2061d7fcc5adc699e3b6c42f7ca8c'; // Utilisation des guillemets simples pour déclarer la clé API

const searchTemperature = () => {
    const city = document.getElementById('city-name').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayTemperature(data));
}

const setInnerText = (id, text) =>{
    document.getElementById(id).innerText = text;
}


const displayTemperature = temperature => {
    console.log(temperature);
    setInnerText('city', temperature.name);
    setInnerText('temp', ` ${temperature.main.temp}`);
    setInnerText('weather', ` ${temperature.weather[0].main}`);
    setInnerText('humidity', ` ${temperature.main.humidity}%`);
    setInnerText('wind-speed', ` ${temperature.wind.speed} Km/h`);

    const url = `http://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`;
    const imgIcon = document.getElementById('image-icon');
    imgIcon.setAttribute('src', url);
}

const cities = ["Azilal", "Tokyo", "Brazilia", "Seoul"];

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`); // Utilisation de API_KEY au lieu de apiKey
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur :', error);
    }
}

function displayWeather(city, data) {
    const weatherContainer = document.getElementById('weather-container');
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');

    const locationElement = document.createElement('div');
    locationElement.classList.add('location');
    locationElement.textContent = data.name;

    const temperatureElement = document.createElement('div');
    temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;

    const conditionsElement = document.createElement('div');
    conditionsElement.textContent = `weather: ${data.weather[0].description}`;

    const image = document.createElement('img');
    image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`

    const humidityElement = document.createElement('div');
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

    const windSpeedElement = document.createElement('div');
    windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherCard.appendChild(locationElement);
    weatherCard.appendChild(image);
    weatherCard.appendChild(temperatureElement);
    weatherCard.appendChild(conditionsElement);
    weatherCard.appendChild(humidityElement);
    weatherCard.appendChild(windSpeedElement);

    weatherContainer.appendChild(weatherCard);
}

async function fetchAndDisplayWeather() {
    for (const city of cities) {
        const data = await getWeatherData(city);
        displayWeather(city, data);
        console.log(data);
    }
}


fetchAndDisplayWeather();