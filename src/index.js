import './style.css';
import changeBg from './animation.js';
//import getCord from './geolocation.js';
import Icon from './img/weather-app.png';
import $ from 'jquery';

window.addEventListener("load", changeBg);

//RICHIAMO API

const api_key = process.env.API_KEY;

// BOX INFO

let weatherBox = document.getElementById("box-weather");

//COMPORTAMENTO GEOLOCALIZATION

let geolBtn = document.getElementById('btn-geol');

geolBtn.addEventListener("click", getCord);

function getCord(){

$(weatherBox).empty();

let weatherTitle = document.createElement('h2');
weatherTitle.innerHTML = "<h2>Loading Data</h2>";

navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);

  var apiWCord = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon=' + lon + '&units=metric&appid=' + api_key;

  $.getJSON(apiWCord, getCordData);

  function getCordData(data){

        //        let weatherTitle = document.createElement('h2');
                weatherBox.innerHTML = '';
                weatherTitle.innerHTML = "<h2>Today's Weather in " + data.name + "</h2>";

                let imgWeather = document.createElement('img');
                switch(data.weather[0].main){
                  case 'Clouds':
                    imgWeather.setAttribute("src", "../src/img/clouds.png");
                    break;
                  case 'Mist':
                    imgWeather.setAttribute("src", "../src/img/mist.png");
                    break;
                  case 'Clear':
                    imgWeather.setAttribute("src", "../src/img/clear.png");
                    break;
                  case 'Rain':
                    imgWeather.setAttribute("src", "../src/img/rain.png");
                    break;
                  case 'Snow':
                    imgWeather.setAttribute("src", "../src/img/snow.png");
                    break;
                  default:
                    console.log('nessuna corrispondenza');
                }

                let tempCur = Math.round(data.main.temp);
                let tempNow = document.createElement('h3');
                tempNow.innerHTML = 'Current temperature:<br><b>' + tempCur + '&#176 C</b>' ;

                let tempMax = Math.round(data.main.temp_max);
                let tempMaxToday = document.createElement('h3');
                tempMaxToday.innerHTML = 'Max temperature:<br><b>' + tempMax + '&#176 C</b>' ;

                let tempMin = Math.round(data.main.temp_min);
                let tempMinToday = document.createElement('h3');
                tempMinToday.innerHTML = 'Min temperature:<br><b>' + tempMin + '&#176 C</b>' ;

                $(weatherBox).append(weatherTitle, imgWeather, tempNow, tempMaxToday, tempMinToday);

  }
});

}
//COMPORTAMENTO INPUT E SEARCH BTN

let cityName = document.getElementById('cityName');
cityName.focus();

cityName.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      getWeatherInfo()
    }
});

let searchBtn = document.getElementById('btn-search');

searchBtn.addEventListener("click", getWeatherInfo);

//funzione recupero dati
function getWeatherInfo(){

  $(weatherBox).empty();

  let cityNsrc = (cityName.value);
  cityNsrc = cityNsrc.substr(0,1).toUpperCase() + cityNsrc.substr(1,cityNsrc.lenght).toLowerCase();

  const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${cityNsrc}&units=metric&appid=${api_key}`;

  //$.getJSON(apiWNow, getData);

//  fetch('http://api.openweathermap.org/data/2.5/weather?q=lazzate&appid=64afecb65358ad814edebfc7ee29a2b7')


  fetch(api_url)
    .then( function (response){
      return response.json();
    })
    .then(function getData(data) {

                let weatherTitle = document.createElement('h2');
                weatherTitle.innerHTML = "<h2>Today's Weather in " + cityNsrc + "</h2>";

                let imgWeather = document.createElement('img');
                switch(data.weather[0].main){
                  case 'Clouds':
                    imgWeather.setAttribute("src", "../src/img/clouds.png");
                    break;
                  case 'Mist':
                    imgWeather.setAttribute("src", "../src/img/mist.png");
                    break;
                  case 'Clear':
                    imgWeather.setAttribute("src", "../src/img/clear.png");
                    break;
                  case 'Rain':
                    imgWeather.setAttribute("src", "../src/img/rain.png");
                    break;
                  case 'Snow':
                    imgWeather.setAttribute("src", "../src/img/snow.png");
                    break;
                  default:
                    console.log('nessuna corrispondenza');
                }

                let tempCur = Math.round(data.main.temp);
                let tempNow = document.createElement('h3');
                tempNow.innerHTML = 'Current temperature:<br><b>' + tempCur + '&#176 C</b>' ;

                let tempMax = Math.round(data.main.temp_max);
                let tempMaxToday = document.createElement('h3');
                tempMaxToday.innerHTML = 'Max temperature:<br><b>' + tempMax + '&#176 C</b>' ;

                let tempMin = Math.round(data.main.temp_min);
                let tempMinToday = document.createElement('h3');
                tempMinToday.innerHTML = 'Min temperature:<br><b>' + tempMin + '&#176 C</b>' ;

                $(weatherBox).append(weatherTitle, imgWeather, tempNow, tempMaxToday, tempMinToday);

        })
    .catch(error => weatherBox.innerHTML = "<h2>City not found, try again</h2>")
}
