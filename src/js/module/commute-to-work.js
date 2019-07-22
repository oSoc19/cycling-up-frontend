import Chart from 'chart.js';

const apiChartCommuteDataUrl = `${process.env.API_URL}/historical/commuting`;
let commuteChart;


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
  const percentage = chartData.map(d => d.percentage);

  const _ctx = document.getElementById(`js-canvas-commute`);
  if (_ctx) {
     commuteChart = new Chart(_ctx, {
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
        responsive: false,
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

export function onChangeLanguage(lang, translation) {
  if (!commuteChart) {
    return;
  }
  commuteChart.data.datasets[0].label = translation['graph_legend'][lang]
  commuteChart.update()

}
