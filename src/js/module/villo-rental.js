import Chart from 'chart.js';

const apiChartCommuteDataUrl = `${
  process.env.API_URL
}/historical/historic_villo_rentals`;

const fetchData = () => {
  return fetch(apiChartCommuteDataUrl).then(r => r.json());
};

export function init() {
  return fetchData().then(showChart);
}

export function showChart(chartData) {
  // Our labels along the x-axis
  const years = chartData.map(d => d.year);
  // For drawing the lines
  const rental = chartData.map(d => d.number_of_rentals);

  const ctx = document.getElementById(`js-canvas-villo`);
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            data: rental,
            label: 'total amount of villo! rental per year',
            borderColor: '#EAB818',
            fill: '#EAB818',
            backgroundColor: '#EAB818'
          }
        ]
      },
      options: {
        responsive: false
      }
    });
  }
}
