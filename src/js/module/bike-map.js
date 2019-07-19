import mapboxgl from 'mapbox-gl';
let bikeMap;
let mapContainer;
// eslint-disable-next-line
let jsonData;
let firstSymbolId;

export default map => {
  mapContainer = map;
  fetch(`../assets/data/service-map.json`)
    .then(response => response.json())
    .then(data => parse(data));
};

const parse = data => {
  jsonData = data;
  showMap();
};

const showMap = () => {
  mapboxgl.accessToken =
    process.env.MAPBOX_ACCESS_TOKEN;

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
    for (let i = 0;i < layers.length;i += 1) {
      if (layers[i].type === 'symbol') {
        firstSymbolId = layers[i].id;
        break;
      }
    }
    showGFRNetworkLayer();
  });
};

const showGFRNetworkLayer = () => {
  bikeMap.addSource('bikeGFR', {
    type: 'geojson',
    data: 'https://api.cyclingup.osoc.be/map/general/bike_icr'
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
