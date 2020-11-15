export default function changeBg(){
  let bodyHours = new Date().getHours();
  document.body.className = (bodyHours >= 6 && bodyHours < 20 ? 'giorno' : 'notte');
  document.getElementById('box-weather').classList.add(bodyHours >= 6 && bodyHours < 20 ? 'weather-day' : 'weather-nite');

  let butGN = document.getElementById('buttonGN');

  butGN.addEventListener("click", giornoNotte);


    function giornoNotte(){

    if (document.body.classList.contains('giorno')){
      butGN.innerHTML= '<i class="far fa-sun"></i>';
      document.body.classList.remove("giorno");
      document.body.classList.add("notte");
      document.getElementById('box-weather').classList.remove("weather-day");
      document.getElementById('box-weather').classList.add("weather-nite");
    } else if (document.body.classList.contains('notte')){
      butGN.innerHTML= '<i class="far fa-moon"></i>';
      document.body.classList.remove("notte");
      document.body.classList.add("giorno");
      document.getElementById('box-weather').classList.remove("weather-nite");
      document.getElementById('box-weather').classList.add("weather-day");
    } else {
      butGN.innerHTML= '';
    }};
};
