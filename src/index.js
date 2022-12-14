let today = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let todayHours = date.getHours();
  if (todayHours < 10) {
    todayHours = `0${todayHours}`;
  }
  let todayMinutes = date.getMinutes();
  if (todayMinutes < 10) {
    todayMinutes = `0${todayMinutes}`;
  }
  let todayDay = days[date.getDay()];
  let todayMonth = months[date.getMonth()];
  let todayDate = date.getDate();

  let formattedDate = `${todayMonth} ${todayDate}, ${todayDay} ${todayHours}:${todayMinutes}`;

  return formattedDate;
}
let h3 = document.querySelector("h3");
h3.innerHTML = formatDate(today);

// show forecast
function displayFormat(timetable) {
  let date = new Date(timetable * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastEl = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2 forecast-day">
                <div class="forecast-day-header">${displayFormat(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="45"
                />
                <div class="forecast-temp">
                  <span class="forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
}

// search city
function defaultCity(city) {
  let apiKey = "9b73d63d9f5a648889da1648b3215332";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function changeCity(event) {
  event.preventDefault();
  let city = searchInput.value;
  defaultCity(city);
}

let searchInput = document.querySelector("#change-city");
let h1 = document.querySelector("h1");
function showPosition(position) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#change-city-form");
form.addEventListener("submit", changeCity);
function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#current-city");
button.addEventListener("click", currentCity);
// show temp
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  celsiusTemp = response.data.main.temp;
  let temp = Math.round(response.data.main.temp);
  let newCity = response.data.name;

  h1.innerHTML = newCity;
  let tempCity = document.querySelector("#temp-city");
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  tempCity.innerHTML = temp;
  document.querySelector("#about-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${wind} Km/H`;
  let iconSky = document.querySelector("#icon-sky");
  let currentIcon = response.data.weather[0].icon;
  iconSky.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentIcon}@2x.png`
  );
  iconSky.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

defaultCity("Kharkiv");
