let arrayDates = [];
let arrayNumbers = [];

window.onload = async () => {
  const res = await fetch(`https://covid19.mathdro.id/api/daily`);
  const data = await res.json();
  data.map(dataElement => {
    const { totalConfirmed, reportDate, deaths } = dataElement;
    const totalDeaths = deaths.total;
    arrayDates.push(reportDate);
    arrayNumbers.push({ totalConfirmed, totalDeaths });
  });
  drawChart();
}

function drawChart() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: arrayDates,
      datasets: [
        {
          label: 'Infecciones',
          data: arrayNumbers.map(obj => obj['totalConfirmed']),
          borderWidth: 1,
          borderColor: 'blue'

        },
        {
          label: 'Decesos',
          data: arrayNumbers.map(obj => obj['totalDeaths']),
          borderWidth: 1,
          borderColor: 'red',
          backgroundColor: '#ff000081'
        }
      ],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
