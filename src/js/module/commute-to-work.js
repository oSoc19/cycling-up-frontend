import Chart from 'chart.js';

let commuteChart;


export function init () {
  // Our labels along the x-axis
  const years = [2005, 2011, 2014, 2017];
  // For drawing the lines
  const percentage = [1.2, 1.9, 3, 4.4];

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
