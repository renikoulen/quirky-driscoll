//current date replacing original entry
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[new Date().getDay()];
let currentHour = new Date().getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = new Date().getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let current = document.querySelector("#date");
current.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

//city input replacing original entry
function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-input");
  let key = "6643c7326a4c2a38838264a28531d97e";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${key}`;

  let h1 = document.querySelector("#city");
  h1.innerHTML = `${searchInput.value}`;
  axios.get(url).then(showWeather);
}
let form = document.querySelector("#city-search");
form.addEventListener("submit", search);

function showWeather(response) {
  let temperatureClass = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureClass.innerHTML = `${temperature}°`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weatherdesc");
  weatherDescription.innerHTML = response.data.weather[0].main;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity:${humidity}%`;

  let windSpeedElement = document.querySelector("#windSpeed");
  let windSpeed = Math.round((response.data.wind.speed * 3600) / 1000);
  windSpeedElement.innerHTML = `Wind: ${windSpeed} km/h`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6643c7326a4c2a38838264a28531d97e";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(showPosition);
