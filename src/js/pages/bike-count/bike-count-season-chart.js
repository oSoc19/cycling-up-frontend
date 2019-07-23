import Chart from 'chart.js';

// Our labels along the x-axis
let years = [
  1998,
  1999,
  2000,
  2001,
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
  2017
];

const API_BIKE_COUNT_BY_STATION_ID = process.env.API_URL + "/chart/bike_count/";


// For drawing the lines

const counts = [
  {
    id: 'jan',
    label: 'January',
    borderColor: 'rgba(50, 54, 96, 1)',
    backgroundColor: 'rgba(50, 54, 96, 1)'
  },
  {
    id: 'may',
    label: 'May',
    borderColor: 'rgba(239, 185, 52, 1)',
    backgroundColor: 'rgba(239, 185, 52, 1)'
  },
  {
    id: 'sep',
    label: 'September',
    borderColor: 'rgba(195, 214, 230, 1)',
    backgroundColor: 'rgba(195, 214, 230, 1)'
  },
  {
    id: 'nov',
    label: 'November',
    borderColor: 'rgba(134, 147, 199, 1)',
    backgroundColor: 'rgba(134, 147, 199, 1)'
  }
]


let bikeCountChart;

export function showChart(ctx) {
  if (ctx) {
    bikeCountChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: counts
      },
      options: {
        responsive: false,
        title: {
          display: true,
          fontSize: 16,
          position : "bottom",
          text: "Click on the blue circle on the map to get more info"
        }
      }
    });
  }
};


export function onChangeLanguage(lang, translation) {
  if (!bikeCountChart) {
    return;
  }

  bikeCountChart.data.datasets[0].label = translation['graph_legend'][lang]
  bikeCountChart.update()
}


export function onSelectedBikeStation(stationId, stationName) {
  fetch(API_BIKE_COUNT_BY_STATION_ID + stationId)
    .then(res => res.json())
    .then(({ properties }) => {
      const newDataSet = [];
      for (const count_month of counts) {
        const data = Object.values(properties.count_data[count_month.id])
        const dataset = Object.assign(count_month, {
          fill: false,
          data
        });
        newDataSet.push(dataset);
      }

      bikeCountChart.data.datasets = newDataSet;
      bikeCountChart.options.title = {
        display: true,
        position : "bottom",
        fontSize: 16,
        text: stationName
      };
      bikeCountChart.update()
    })
}

