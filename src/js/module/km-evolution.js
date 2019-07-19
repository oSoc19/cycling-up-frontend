import Chart from 'chart.js';

export default () => {
  // Our labels along the x-axis
  const years = [
    1896,
    1899,
    1902,
    1905,
    1908,
    1911,
    1914,
    1917,
    1920,
    1923,
    1926,
    1929,
    1932,
    1935,
    1938,
    1941,
    1944,
    1947,
    1950,
    1953,
    1956,
    1959,
    1962,
    1965,
    1968,
    1971,
    1974,
    1977,
    1980,
    1983,
    1986,
    1989,
    1992,
    1995,
    1998,
    2001,
    2004,
    2007,
    2010,
    2013,
    2016,
    2019
  ];
  // For drawing the lines
  const km = [
    3.985,
    6.46,
    6.46,
    6.46,
    6.46,
    6.46,
    6.46,
    6.46,
    6.46,
    6.46,
    6.46,
    6.46,
    6.46,
    6.46,
    6.46,
    8.24,
    8.24,
    8.24,
    8.24,
    8.24,
    8.24,
    8.24,
    8.24,
    8.24,
    8.24,
    9.71,
    9.71,
    9.71,
    41.42,
    44.13,
    49.59,
    54.86,
    65.82,
    65.82,
    79.61,
    105.92,
    124.19,
    138.47,
    220.03,
    316.51,
    472.6,
    481.019
  ];

  const ctx = document.getElementById(`js-canvas-evolution`);
  if (ctx) {
    new Chart(ctx, {
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
