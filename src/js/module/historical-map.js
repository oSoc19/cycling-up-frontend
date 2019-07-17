import mapboxgl from 'mapbox-gl';

const HISTO_MAP_URL = process.env.API_URL + '/map/historical/';

console.log(HISTO_MAP_URL + "2019")


export default $mapContainer => {
  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

  const historicalMap = new mapboxgl.Map({
    container: $mapContainer,
    style: 'mapbox://styles/danielleterras/cjxoemrlt08nn1cmlm2owey24',
    zoom: 13.5,
    center: [4.35500, 50.84700]
  });

  historicalMap.on('load', () => {

    historicalMap.addSource('api_cycling_historical_map', {
      type: 'geojson',
      data: HISTO_MAP_URL + '2019'
    })

    historicalMap.addLayer({
      id: 'historical_map',
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



  window.addEventListener('load', () => {
    historicalMap.resize();
  });
};
