export default function changeBg(){
  let bodyHours = new Date().getHours();
  document.body.className = (bodyHours >= 6 && bodyHours < 20 ? 'giorno' : 'notte');
  document.getElementById('box-weather').classList.add(bodyHours >= 6 && bodyHours < 20 ? 'weather-day' : 'weather-nite');
};
