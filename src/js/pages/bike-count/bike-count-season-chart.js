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

const API_BIKE_COUNT_BY_STATION_ID = process.env.API_URL + "/bike_count/";


// For drawing the lines

const count = [
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
    backgroundColor: 'rgba(239, 185, 52, 1)',
  },
  {
    id: 'sep',
    label: 'September',
    borderColor: 'rgba(195, 214, 230, 1)',
    backgroundColor: 'rgba(195, 214, 230, 1)',
  },
  {
    id: 'nov',
    label: 'November',
    borderColor: 'rgba(134, 147, 199, 1)',
    backgroundColor: 'rgba(134, 147, 199, 1)',
  }
]


let bikeCountChart;

export function showChart(ctx) {
  if (ctx) {
    bikeCountChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'January',
            borderColor: 'rgba(50, 54, 96, 1)',
            backgroundColor: 'rgba(50, 54, 96, 1)',
            data: [
              277,
              292,
              302,
              403,
              395,
              395,
              395,
              582,
              661,
              736,
              962,
              872,
              936,
              1544,
              1438,
              1432,
              2323,
              2304,
              2408,
              2810
            ],
            fill: false
          },
          {
            label: 'May',
            fill: false,
            borderColor: 'rgba(239, 185, 52, 1)',
            backgroundColor: 'rgba(239, 185, 52, 1)',
            data: [
              781,
              598,
              642,
              836,
              800,
              964,
              1253,
              1416,
              1370,
              1724,
              1829,
              1961,
              2433,
              2669,
              2491,
              2398,
              3267,
              3222,
              4609,
              4432
            ]
          },
          {
            label: 'September',
            fill: false,
            borderColor: 'rgba(195, 214, 230, 1)',
            backgroundColor: 'rgba(195, 214, 230, 1)',
            data: [
              635,
              682,
              747,
              712,
              904,
              1254,
              1221,
              1651,
              1672,
              1644,
              2177,
              2397,
              2446,
              2615,
              2792,
              3250,
              3622,
              3538,
              4801,
              3966
            ]
          },
          {
            label: 'November',
            fill: false,
            borderColor: 'rgba(134, 147, 199, 1)',
            backgroundColor: 'rgba(134, 147, 199, 1)',
            data: [
              337,
              401,
              490,
              445,
              508,
              508,
              508,
              851,
              994,
              995,
              1034,
              1506,
              1565,
              2222,
              2238,
              2125,
              2696,
              3151,
              3382,
              3718
            ]
          }
        ]
      },
      options: {
        responsive: false
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
      for (const count_month of count) {
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
        text: stationName
      };
      bikeCountChart.update()
    })
}

