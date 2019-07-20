import mapboxgl from 'mapbox-gl';

const HISTO_MAP_URL = process.env.API_URL + '/map/historical/';
let historicalMap ;


export function showMap ({ctx}) {
  if (!ctx) {
    ctx = document.getElementById('#js-map-historical');
  }

  const historicalLayerId = 'historical_map';

  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

  historicalMap = new mapboxgl.Map({
    container: ctx,
    style: process.env.MAPBOX_STYLE,
    zoom: 11,
    center: [4.35500, 50.84700]
  });

  historicalMap.on('load', () => {

    historicalMap.addSource('api_cycling_historical_map', {
      type: 'geojson',
      data: HISTO_MAP_URL + '2019'
    })

    historicalMap.addLayer({
      id: historicalLayerId,
      type: 'line',
      source: 'api_cycling_historical_map',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#EAB818',
        'line-width': 3
      }
    });
  });

  const handleMapLineSelect = function (e) {
    const [selected] = e.features;

    // TODO:  Replace the code below by the specfic actions on the click
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(selected.properties.type_nl)
      .addTo(historicalMap);
  };


  historicalMap.on('click', historicalLayerId, handleMapLineSelect);

  historicalMap.on('touchend', historicalLayerId, handleMapLineSelect)


  window.addEventListener('load', () => {
    historicalMap.resize();
  });

  return true;
};


export function onChangeLanguage(lang, translations) {
  // console.log(lang, translations);

}