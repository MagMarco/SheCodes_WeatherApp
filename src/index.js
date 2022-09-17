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
  let apiKey = "9b73d63d9f5a648889da1648b3215332";
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
function showTemperature(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let newCity = response.data.name;

  h1.innerHTML = newCity;
  let tempCity = document.querySelector("#temp-city");
  tempCity.innerHTML = temp;
  document.querySelector("#about-weather").innerHTML =
    response.data.weather[0].main;
}

defaultCity("Kharkiv");
