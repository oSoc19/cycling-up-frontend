import mapboxgl from 'mapbox-gl';


let villoMap;
let mapContainer;
// eslint-disable-next-line
let jsonData;

const MAP_VILLO_API_URL = 'http://data-mobility.brussels/geoserver/bm_bike/wfs?service=wfs&version=1.1.0&request=GetFeature&srsName=EPSG:4326&outputFormat=json&typeName=bm_bike:rt_counting';


export const map = () => {
  mapContainer = map;
  fetch(MAP_VILLO_API_URL)
    .then(response => response.json())
    .then(data => parse(data));
};

const parse = data => {
  jsonData = data;
  showMap();
};

export const init = showMap;

function showMap({ctx:mapContainer}) {
  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

  villoMap = new mapboxgl.Map({
    container: mapContainer,
    style: process.env.MAPBOX_STYLE,
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
    data: MAP_VILLO_API_URL
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

export function onChangeLanguage(lang, translations) {
}
