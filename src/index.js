import './style.css';
import changeBg from './animation.js';
import getCord from './geolocalization.js';
import getWeatherInfo from './src.js';
import Logo from './img/weather-app.png';
import BgG from './img/bg-giorno.jpg';
import BgN from './img/bg-notte.jpg';
import Clear from './img/clear.png';
import Cloud from './img/clouds.png';
import Mist from './img/mist.png';
import Rain from './img/rain.png';
import Snow from './img/snow.png';
import $ from 'jquery';

//PAGE SETTING

let logoImg = document.getElementById('logo');
logoImg.setAttribute("src", "./img/weather-app.png");

window.addEventListener("load", changeBg);

// GEOLOCALIZATION

let geolBtn = document.getElementById('btn-geol');

geolBtn.addEventListener("click", getCord);

// INPUT E SEARCH BTN

let cityName = document.getElementById('cityName');
cityName.focus();

cityName.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      getWeatherInfo()
    }
});

let searchBtn = document.getElementById('btn-search');

searchBtn.addEventListener("click", getWeatherInfo);
