import mapboxgl from 'mapbox-gl';

export default map => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsbGV0ZXJyYXMiLCJhIjoiY2pqNWhzNGxrMWZmeTN2b2hndWdwenBxdCJ9.YKuXXhdcq1Dks53qu5q-Hw';

  const serviceMap = new mapboxgl.Map({
    container: map,
    style: 'mapbox://styles/danielleterras/cjxoemrlt08nn1cmlm2owey24',
    zoom: 11.5,
    center: [4.35500, 50.84700]
  });

  serviceMap.on('load', function() {
    serviceMap.addSource('bike_parking', {
      type: 'geojson',
      data: 'https://api.cyclingup.osoc.be/api/map/general/bike_parking',
    });

    serviceMap.addSource('bike_pump', {
      type: 'geojson',
      data: 'https://api.cyclingup.osoc.be/api/map/general/bike_pump',
    });

    serviceMap.addLayer({
      id: 'bikeParking',
      type: 'circle',
      source: 'bike_parking',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#2D3E71',
        'circle-radius': 5
      }
    });

    serviceMap.addLayer({
      id: 'bikePump',
      type: 'circle',
      source: 'bike_pump',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#EAB818',
        'circle-radius': 10
      }
    });
  });


  window.addEventListener('load', () => {
    serviceMap.resize();
  });
};
