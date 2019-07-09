{
  // Our labels along the x-axis
  const amount = [
    1896,
    1898,
    1940,
    1970,
    1980,
    1981,
    1985,
    1988,
    1989,
    1990,
    1998,
    2000,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019
  ];
  // For drawing the lines
  const infrastructureData = [
    2.555,
    1.01,
    0.39,
    0.31,
    33.928,
    0.82,
    2.015,
    0.31,
    0.62,
    17.778,
    14.948,
    31.837,
    15.055,
    0.225,
    2.395,
    3.5,
    6.75,
    3.005,
    33.823,
    42.93,
    9.268,
    6.261,
    36.196,
    74.292,
    116.343,
    38.394,
    6.258,
    1.359,
    2.9,
    4.11
  ];

  const historyCtx = document.getElementById(`history`);
  const infrastructureChart = new Chart(historyCtx, {
    type: 'line',
    data: {
      labels: amount,
      datasets: [
        {
          data: infrastructureData,
          label: '% of investments in bicycle paths',
          borderColor: '#f9b138',
          fill: false
        }
      ]
    }
  });
}
