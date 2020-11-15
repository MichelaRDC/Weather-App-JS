import $ from 'jquery';
const api_key = process.env.API_KEY;

let weatherBox = document.getElementById("box-weather");
let weatherTitle = document.createElement('h2');
let imgWeather = document.createElement('img');
let tempNow = document.createElement('h3');
let tempMaxToday = document.createElement('h3');
let tempMinToday = document.createElement('h3');

export default function getWeatherInfo(){

  $(weatherBox).empty();

  let cityNsrc = (cityName.value);
  cityNsrc = cityNsrc.substr(0,1).toUpperCase() + cityNsrc.substr(1,cityNsrc.lenght).toLowerCase();

  const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${cityNsrc}&units=metric&appid=${api_key}`;

  fetch(api_url)
    .then( function (response){
      return response.json();
    })
    .then(function getData(data) {

                weatherTitle.innerHTML = "<h2>Today's Weather in " + cityNsrc + "</h2>";

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

        })
    .catch(error => weatherBox.innerHTML = "<h1>City not found, try again");
};
