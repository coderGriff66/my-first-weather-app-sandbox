function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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
    "December"
  ];
  let now = new Date(timestamp);
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();

  let whatDateElement = document.querySelector("#what-date");
  whatDateElement.innerHTML = `${day}, ${month} ${date}, ${year}`;

  return `${day}, ${month}, ${date}, ${year}`;
}

let whatDateElement = document.querySelector("#what-date");
let currentDay = new Date();
whatDateElement.innerHTML = formatDate(currentDay);

function ourTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

let whatTimeElement = document.querySelector("#what-time");
whatTimeElement.innerHTML = ourTime(currentDay);

function findCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let searchCity = document.querySelector("#search-city");
  cityElement.innerHTML = searchCity.value;

  let apiKey = "06e5d3dda0232566f39a1df37e2d5cdd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", findCity);

function showTemp(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#temp-now");
  h2.innerHTML = temp;
  let h1 = document.querySelector("#city");
  h1.innerHTML = city;
  let h3 = document.querySelector("#sky-now");
  h3.innerHTML = response.data.weather[0].description;
  //document.querySelector("#big-temp-icon").innerHTML = response.data.weather[2];
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#barom").innerHTML = response.data.main.pressure;
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  //document.querySelector("#direction").innerHTML = response.data.wind.direction[1];
  document.querySelector("#winds").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "06e5d3dda0232566f39a1df37e2d5cdd";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?q";
  let apiUrl = `${endPoint}&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
