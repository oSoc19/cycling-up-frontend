export default () => {

  // Our labels along the x-axis
  const years = [1896, 1898, 1940, 1970, 1980, 1981, 1985, 1988, 1990, 1998, 2000, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
  // For drawing the lines
  const km = [3.985, 6.465, 8.245, 9.715, 41.421, 44.131, 49.591, 54.861, 65.826, 79.611, 105.924, 120.979, 121.754, 124.196, 128.721, 135.471, 138.476, 172.299, 214.886, 220.036, 226.297, 244.213, 316.511, 427.998, 466.392, 472.65, 474.009, 476.909, 481.019];

  const ctx = document.getElementById(`cumulated`);
  const kmChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
          data: km,
          label: 'cumulated amount of kilometers per year of the total amount of cyclable paths',
          borderColor: '#f9b138',
          fill: '#fff',
          backgroundColor: 'rgba(0,0,0,0)'
      }]
    }
  });
}
