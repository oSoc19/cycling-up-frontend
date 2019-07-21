import mapboxgl from 'mapbox-gl';

const serviceJson = require("../../../assets/data/service-map.json");


const MAP_GFR_API_URL = process.env.API_URL + '/map/general/bike_icr';

let bikeMap;
let mapContainer;
// eslint-disable-next-line
let jsonData;
let firstSymbolId;



export function init({ctx:mapContainer}) {
  mapboxgl.accessToken =  process.env.MAPBOX_ACCESS_TOKEN;

  bikeMap = new mapboxgl.Map({
    container: mapContainer,
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


export function onChangeLanguage(lang, translations) {
  console.log(lang, translations);
  // commuteChart.data.datasets[0].label = translations[lang]['legend']
}
