{
  // Our labels along the x-axis
  const years = [2005, 2011, 2014, 2019];
  // For drawing the lines
  const africa = [1.2, 1.9, 3, 3.1];

  const ctx = document.getElementById(`canvas`);
  const commuteChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          data: africa,
          label: '% of cyclist that commute to work',
          borderColor: 'rgba(185, 206, 228, .1)',
          fill: '#f9b138'
        }
      ]
    }
  });

  const sex = ['women', 'men'];
  const data = [52, 48];

  const helmet = document.getElementById(`helmet`);
  const helmetChart = new Chart(helmet, {
    type: 'doughnut',
    data: {
      labels: sex,
      datasets: [
        {
          data: data,
          label: '% of sex that weares a helmet',
          borderColor: '#ffffff',
          fill: '#ffffff'
        }
      ]
    }
  });
}
