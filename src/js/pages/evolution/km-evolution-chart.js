import Chart from 'chart.js';

const regionalKmChartDataUrl = `${process.env.API_URL}/chart/cumulated_kilometers_regional_roads`;
const gfrKmChartDataUrl = `${process.env.API_URL}/chart/cumulated_kilometers_gfr`;

let evolutionChart;

const fetchData = () => {
  return Promise.all([
    regionalKmChartDataUrl,
    gfrKmChartDataUrl
  ].map(url =>
    fetch(url).then(res => res.json())
  ))


};

export function init(ctx) {
  return fetchData().then(data => showChart(ctx, data));
}

export function showChart(ctx, [regionalData, gfrData]) {

  const datasets = [
    {
      id: 'region',
      label: 'Cumulated amount of km per year of regionnal paths',
      borderColor: 'rgba(239, 185, 52, 1)',
      backgroundColor: 'rgba(239, 185, 52, 1)',
      data : [],
      fill: false,
      spanGaps: true,
    },
    {
      id: 'gfr',
      label: 'Cumulated amount of km per year of GFR paths',
      borderColor: 'rgba(195, 214, 230, 1)',
      backgroundColor: 'rgba(195, 214, 230, 1)',
      data : [],
      fill: false,
      spanGaps: true,
    }
  ]
  // Our labels along the x-axis
  const years = regionalData.map(rd => rd.year);

  // For drawing the lines
  const sortChartData = (d1, d2) => d1['year'] - d2['year'];
  datasets[0].data = regionalData.map(d => ({x : d['year'], y : d['cumulated_kilometers'] })).sort(sortChartData);
  datasets[1].data = gfrData.map(d => ({x : d['year'], y : d['cumulated_kilometers'] })).sort(sortChartData);

  if (ctx) {
    evolutionChart = new Chart(ctx, {
      type: 'line',
      // labels,
      data: {
        labels : years,
        datasets
      },
      options: {
        responsive: false
      }
    });

    return true;
  }
};

export function onChangeLanguage(graph_legend) {
  if (!evolutionChart) {
    return;
  }
  evolutionChart.data.datasets[0].label = graph_legend
  evolutionChart.update()

}
