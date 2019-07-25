import Chart from 'chart.js';

const apiChartCommuteDataUrl = `${
  process.env.API_URL
}/chart/historic_villo_rentals`;

let villoChart;


const fetchData = () => {
  return fetch(apiChartCommuteDataUrl).then(r => r.json());
};

export function init(ctx) {
  return fetchData().then(data => showChart(ctx, data));
}

export function showChart(ctx, chartData) {
  // Our labels along the x-axis
  const years = chartData.map(d => d.year);
  // For drawing the lines
  const rental = chartData.map(d => d.nb_of_rentals);

  if (ctx) {
    villoChart= new Chart(ctx, {
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
        responsive: true
      }
    });
  }
};

export function onChangeLanguage(graph_legend) {
  if (!villoChart) {
    return;
  }
  villoChart.data.datasets[0].label = graph_legend
  villoChart.update()

}
