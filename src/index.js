import './style.css';
import changeBg from './animation.js';
import getCord from './geolocalization.js';
import getWeatherInfo from './search.js';
import Icon from './img/weather-app.png';
import $ from 'jquery';

window.addEventListener("load", changeBg);

// API

const api_key = process.env.API_KEY;

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
