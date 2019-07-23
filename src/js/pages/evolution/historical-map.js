import mapboxgl from 'mapbox-gl';

const HISTO_MAP_URL = process.env.API_URL + '/map/historical/';
let $slider, historicalMap;


export function showMap(container) {
  const historicalLayerId = 'historical_map';

  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

  historicalMap = new mapboxgl.Map({
    container,
    style: process.env.MAPBOX_STYLE,
    zoom: 10.6,
    center: [4.35500, 50.82700]
  });

  historicalMap.on('load', () => {
    $slider = document.querySelector('input[type="range"]');
    $slider.addEventListener('input', sliderHandler);
  });


  window.addEventListener('load', () => {
    historicalMap.resize();
  });
};


const sliderHandler = () => {
  const value = $slider.value;
  const historicalLayerSource = `api_cycling_historical_map_${value}`;


  const mapLayer = historicalMap.getLayer(historicalLayerSource);
  if (typeof mapLayer == 'undefined') {
    historicalMap.addSource(historicalLayerSource, {
      type: 'geojson',
      data: HISTO_MAP_URL + value
    });


    historicalMap.addLayer({
      id: historicalLayerSource,
      type: 'line',
      source: historicalLayerSource,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#EAB818',
        'line-width': 3
      }
    });

    return true;
  };
};


export function onChangeLanguage(lang, translations) {

}
