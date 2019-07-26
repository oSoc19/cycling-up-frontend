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
      label: 'Cumulated amount of km per year of RCI',
      borderColor: 'rgba(239, 185, 52, 1)',
      backgroundColor: 'rgba(239, 185, 52, 1)',
      data: [],
      fill: false,
      spanGaps: true,
    },
    {
      id: 'gfr',
      label: 'Cumulated amount of km per year of GFR',
      borderColor: 'rgba(195, 214, 230, 1)',
      backgroundColor: 'rgba(195, 214, 230, 1)',
      data: [],
      fill: false,
      spanGaps: true,
    }
  ]
  // Our labels along the x-axis
  let years = [].concat(
    regionalData.map(rd => rd.year),
    gfrData.map(rd => rd.year)
  );
  years = Array.from(new Set(years)).sort()


  const _createChartData = data => {
    return years.map(year => {
      const value = data.find(d => d['year'] == year) || {};
      return value['cumulated_kilometers'];
    })
  }

  datasets[0].data = _createChartData(regionalData)

  datasets[1].data = _createChartData(gfrData)

  if (ctx) {
    evolutionChart = new Chart(ctx, {
      type: 'line',
      // labels,
      data: {
        labels: years,
        datasets
      },
      options: {
        responsive: true,
				hover: {
					mode: 'nearest',
					intersect: true
				},
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 9, // years.length / 5,
              // stepSize: 10
            }
          }]
        }
      }
    });

    return true;
  }
};

export function onChangeLanguage(regionLegend, gfrLegend) {
  if (!evolutionChart) {
    return;
  }

  evolutionChart.data.datasets[0].label = regionLegend;
  evolutionChart.data.datasets[1].label = gfrLegend;
  evolutionChart.update();
}
