import mapboxgl from 'mapbox-gl';
let villoMap;
let mapContainer;
// eslint-disable-next-line
let jsonData;

export default map => {
  mapContainer = map;
  fetch(`https://api.cyclingup.osoc.be/map/general/bike_villo`)
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

  villoMap = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/danielleterras/cjy6xbvqi20xk1cliotdrzpt5',
    zoom: 11.5,
    center: [4.355, 50.847]
  });

  window.addEventListener('load', () => {
    villoMap.resize();
  });

  villoMap.on('load', () => {
    villoMap.loadImage('../assets/icons/noun_marker.png', function(
      error,
      image
    ) {
      if (error) throw error;
      villoMap.addImage('Villo!', image);
    });
    showVilloStationsLayer();
  });
};

const showVilloStationsLayer = () => {
  villoMap.addSource('bikeVillo', {
    type: 'geojson',
    data: 'https://api.cyclingup.osoc.be/map/general/bike_villo'
  });

  villoMap.addLayer({
    id: 'bikeVillo',
    type: 'symbol',
    source: 'bikeVillo',
    filter: ['!', ['has', 'point_count']],
    layout: {
      visibility: 'visible',
      'icon-image': 'Villo!',
      'icon-size': 0.1
    }
  });
};
