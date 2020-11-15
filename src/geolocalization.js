import $ from 'jquery';
const api_key = process.env.API_KEY;

let weatherBox = document.getElementById("box-weather");
let weatherTitle = document.createElement('h2');
let imgWeather = document.createElement('img');
let tempNow = document.createElement('h3');
let tempMaxToday = document.createElement('h3');
let tempMinToday = document.createElement('h3');

export default function getCord(){

$(weatherBox).empty();
weatherBox.innerHTML = "Waiting data";

navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);

  var apiWCord = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon=' + lon + '&units=metric&appid=' + api_key;

  $.getJSON(apiWCord, getCordData);

  function getCordData(data){


                weatherBox.innerHTML = '';
                weatherTitle.innerHTML = "<h2>Today's Weather in " + data.name + "</h2>";

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
                tempNow.innerHTML = 'Current temperature:<br><b>' + tempCur + '&#176 C</b>' ;

                let tempMax = Math.round(data.main.temp_max);
                tempMaxToday.innerHTML = 'Max temperature:<br><b>' + tempMax + '&#176 C</b>' ;

                let tempMin = Math.round(data.main.temp_min);
                tempMinToday.innerHTML = 'Min temperature:<br><b>' + tempMin + '&#176 C</b>' ;

                $(weatherBox).append(weatherTitle, imgWeather, tempNow, tempMaxToday, tempMinToday);

  }
});
}