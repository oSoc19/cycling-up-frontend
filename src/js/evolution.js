export default () => {
    // Our labels along the x-axis
    const years = [1896, 1898, 1940, 1970, 1980, 1981, 1985, 1988, 1990, 1998, 2000, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
    // For drawing the lines
    const random = [3.985, 2.48, 1.78, 1.47, 31.706, 2.71, 5.46, 5.27, 10.965, 13.785, 26.313, 15.055, 0.775, 2.442, 4.525, 6.75, 3.005, 33.823, 42.587, 5.15, 6.261, 17.916, 72.298, 111.487, 38.394, 6.258, 1.359, 2.9, 4.11];
  
    const ctx = document.getElementById(`evolution`);
    const commuteChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            data: random,
            label: 'total amount of new cyclable paths built at a t-year (in kilometers)',
            borderColor: 'rgba(185, 206, 228, .1)',
            fill: '#f9b138',
            backgroundColor: '#f9b138'
          }
        ]
      }
    });
  }
  