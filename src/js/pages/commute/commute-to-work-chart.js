import Chart from 'chart.js';

let commuteChart;


export function showChart(ctx) {
  // Our labels along the x-axis
  const years = [2005, 2011, 2014, 2017];
  // For drawing the lines
  const percentage = [1.2, 1.9, 3, 4.4];

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

export function onChangeLanguage(graph_legend) {
  if (!commuteChart) {
    return;
  }
  commuteChart.data.datasets[0].label = graph_legend
  commuteChart.update()

}
