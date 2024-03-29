const API_KEY = `2fa2061d7fcc5adc699e3b6c42f7ca8c`;

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

    // weather icon settings 
    const url = `http://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`;
    const imgIcon = document.getElementById('image-icon');
    imgIcon.setAttribute('src', url);
}
