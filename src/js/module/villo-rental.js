export default () => {
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

  const ctx = document.getElementById(`villo`);
  if (ctx) {
    const kmChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            data: rental,
            label: 'total amount of villo! rental per year',
            borderColor: '#f9b138',
            fill: '#fff',
            backgroundColor: 'rgba(0,0,0,0)'
          }
        ]
      }
    });
  }
};
