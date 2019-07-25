import Chart from 'chart.js';

const apiChartCommuteDataUrl = `${process.env.API_URL}/chart/commuting`;
let commuteChart;


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
  const percentage = chartData.map(d => d.percentage_commuting_to_work);

  if (ctx) {
     commuteChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            data: percentage,
            label: '% of cyclist that commute to work',
            borderColor: 'rgba(185, 206, 228, .1)',
            fill: '#EAB818',
            backgroundColor: '#EAB818'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 0.5
              }
            }
          ]
        }
      }
    });
  }
};

export function onChangeLanguage(graph_legend) {
  if (!commuteChart) {
    return;
  }
  commuteChart.data.datasets[0].label = graph_legend
  commuteChart.update()

}
