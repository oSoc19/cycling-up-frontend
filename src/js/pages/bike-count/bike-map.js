import mapboxgl from 'mapbox-gl';

const serviceJson = require("../../../assets/data/service-map.json");


const MAP_GFR_API_URL = process.env.API_URL + '/map/general/bike_icr';

const MAP_BIKE_STATIONS = "https://raw.githubusercontent.com/oSoc19/cycling-up-backend/1dd28ecea9e4bb4644ffe0d400334afbdc4bce39/process_data/historic_data/historic_bike_stations.json"

let bikeMap;
let firstSymbolId;



export function showMap(container) {
  mapboxgl.accessToken =  process.env.MAPBOX_ACCESS_TOKEN;

  bikeMap = new mapboxgl.Map({
    container,
    style: process.env.MAPBOX_STYLE,
    zoom: 11.5,
    center: [4.355, 50.847]
  });

  window.addEventListener('load', () => {
    bikeMap.resize();
  });

  bikeMap.on('load', () => {
    const layers = bikeMap.getStyle().layers;

    // Find the index of the first symbol layer in the map style
    const layer = layers.find(layer => layer.type === 'symbol')
    if (layer) {
      firstSymbolId = layer.id;
    }
    showGFRNetworkLayer();
    showSations();
  });
};

const showGFRNetworkLayer = () => {
  bikeMap.addSource('bikeGFR', {
    type: 'geojson',
    data: MAP_GFR_API_URL
  });

  bikeMap.addLayer(
    {
      id: 'bikeGFR',
      type: 'line',
      source: 'bikeGFR',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#b9cee2',
        'line-width': 3
      }
    },
    firstSymbolId
  );
};



const showSations = () => {

  bikeMap.addSource('bike_stations', {
    type: 'geojson',
    data: MAP_BIKE_STATIONS
  });

  bikeMap.addLayer(
    {
      id: 'bike_station',
      type: 'circle',
      source : "bike_stations",
      filter: ["==", "$type", "Point"],
      paint: {
        'circle-color': '#2d3e71',
        'circle-radius': 13
      }
    },
  );
};


export function onChangeLanguage(translations) {
  console.log(translations);
  // commuteChart.data.datasets[0].label = translations[lang]['legend']
}
