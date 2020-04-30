const input = document.getElementById('input');
const lastUpdateText = document.querySelector('.lastUpdate');
import { CountUp } from './countUp.min.js';

function startCountUp(confirmados, recuperados, fallecidos) {
  const options = { duration: 0.5 };
  let infectadosC = new CountUp('infectados', confirmados, options);
  let recuperadosC = new CountUp('recuperados', recuperados, options);
  let fallecidosC = new CountUp('fallecidos', fallecidos, options);
  infectadosC.start();
  recuperadosC.start();
  fallecidosC.start();
}

function formatNumber(number) {
  if (number < 10) return '0' + number;
  return number;
}

function getFormatedUpdate(lastUpdate) {
  const now = new Date(lastUpdate);
  const [day, month, year] = [now.getDate(), now.getMonth(), now.getFullYear()];
  const [hours, minutes, seconds] = [now.getHours(), now.getMinutes(), now.getSeconds()];
  const formatedDate = `${formatNumber(day)}-${formatNumber(month)}-${year}`;
  const formatedTime = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  const formatedUpdate = `${formatedDate} - ${formatedTime}`;
  return formatedUpdate;
}

window.onload = async () => {
  const res = await fetch(`https://covid19.mathdro.id/api/`);
  const data = await res.json();
  const { confirmed, recovered, deaths, lastUpdate } = data;
  const formatedUpdate = getFormatedUpdate(lastUpdate);
  lastUpdateText.innerHTML = formatedUpdate;
  startCountUp(confirmed.value, recovered.value, deaths.value);
  input.value = 'Global';
}


input.addEventListener('change', async (event) => {
  let res;
  const selected = event.target.value;

  if (selected !== 'Global')
    res = await fetch(`https://covid19.mathdro.id/api/countries/${selected}`);
  else
    res = res = await fetch('https://covid19.mathdro.id/api/');

  const data = await res.json();
  const { confirmed, recovered, deaths, lastUpdate } = data;
  const formatedUpdate = getFormatedUpdate(lastUpdate);
  lastUpdateText.innerHTML = formatedUpdate;
  startCountUp(confirmed.value, recovered.value, deaths.value);
  input.blur();
});

input.addEventListener('focus', e => e.target.value = '');
input.addEventListener('click', e => e.target.value = '');
