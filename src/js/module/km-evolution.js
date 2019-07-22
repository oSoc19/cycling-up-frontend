import Chart from 'chart.js';

const apiChartCommuteDataUrl = `${process.env.API_URL}/historical/commuting`;
let evolutionChart;

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
  const km = chartData.map(d => d.year);

  const ctx = document.getElementById(`js-canvas-evolution`);
  if (ctx) {
    evolutionChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            data: km,
            label: ' Total amount of km per year of cyclable paths',
            borderColor: '#f9b138',
            fill: '#fff',
            backgroundColor: '#EAB818'
          }
        ]
      },
      options: {
        responsive: false
      }
    });
  }
};

export function onChangeLanguage(lang, translation) {
  if (!evolutionChart) {
    return;
  }
  evolutionChart.data.datasets[0].label = translation['graph_legend'][lang]
  evolutionChart.update()

}
