import $ from 'jquery';
const api_key = process.env.API_KEY;

let weatherBox = document.getElementById("box-weather");
let forecastBox = document.getElementById("box-forecast");
let weatherTitle = document.createElement('h2');

export default function getCord(){

$(weatherBox).empty();
weatherBox.innerHTML = "Waiting data";

navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);

  var apiWCord = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat +'&lon=' + lon + '&units=metric&appid=' + api_key;

  $.getJSON(apiWCord, getCordData);

  function getCordData(data){
      $(forecastBox).empty();
      weatherBox.innerHTML = '';
      weatherTitle.innerHTML = "<h2>Weather in " + data.city.name + "</h2>";

      for (let i = 0; i < 8 ; i++) {
        let divInfo = document.createElement('div');
        let tempForec = Math.round(data.list[i].main.temp);
        let dataF = data.list[i].dt_txt;
        let dataForec = dataF.slice(10,13);
        let tempForBox = document.createElement('h4');
        tempForBox.innerHTML = '<h4>H ' + dataForec + '<br><b>' + tempForec + '&#176 C</b></h4>' ;
        let imgWeather = document.createElement('img');
        console.log(data.list[i].weather[0].main);
        switch(data.list[i].weather[0].main){
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
        divInfo.appendChild(tempForBox);
        divInfo.appendChild(imgWeather);
        forecastBox.appendChild(divInfo);
        if (i === 0){
          tempForBox.innerHTML = '<h4>Now<br><b>' + tempForec + '&#176 C</b></h4>' ;
        } else {
          tempForBox.innerHTML = '<h4>h ' + dataForec + '<br><b>' + tempForec + '&#176 C</b></h4>' ;
        }
      }

      $(weatherBox).append(weatherTitle, forecastBox);
    }
  })
}
