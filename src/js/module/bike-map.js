import mapboxgl from 'mapbox-gl';
let bikeMap;
let mapContainer;
// eslint-disable-next-line
let jsonData;

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
    'pk.eyJ1IjoiZGFuaWVsbGV0ZXJyYXMiLCJhIjoiY2pqNWhzNGxrMWZmeTN2b2hndWdwenBxdCJ9.YKuXXhdcq1Dks53qu5q-Hw';

  bikeMap = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/danielleterras/cjy6xbvqi20xk1cliotdrzpt5',
    zoom: 11.5,
    center: [4.355, 50.847]
  });

  window.addEventListener('load', () => {
    bikeMap.resize();
  });

  bikeMap.on('load', () => {
    showGFRNetworkLayer();
  });
};

const showGFRNetworkLayer = () => {
  bikeMap.addSource('bikeGFR', {
    type: 'geojson',
    data: 'https://api.cyclingup.osoc.be/api/map/general/bike_icr'
  });

  bikeMap.addLayer({
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
  });
};
