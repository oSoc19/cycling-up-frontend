import Chart from 'chart.js';

// Our labels along the x-axis
const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
// For drawing the lines
const rental = [
  871916,
  1217687,
  1412255,
  1423182,
  1645779,
  1508265,
  1577811,
  1615160
];

let villoChart;

export function showChart (ctx) {

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
        responsive: false
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
