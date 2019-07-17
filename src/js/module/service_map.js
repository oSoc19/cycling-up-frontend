import mapboxgl from 'mapbox-gl';

export default map => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZGFuaWVsbGV0ZXJyYXMiLCJhIjoiY2pqNWhzNGxrMWZmeTN2b2hndWdwenBxdCJ9.YKuXXhdcq1Dks53qu5q-Hw';

  const serviceMap = new mapboxgl.Map({
    container: map,
    style: 'mapbox://styles/danielleterras/cjy6xbvqi20xk1cliotdrzpt5',
    zoom: 11.5,
    center: [4.355, 50.847]
  });

  serviceMap.on('load', function() {


    serviceMap.addSource('bike_infra', {
      type: 'geojson',
      data: ' https://api.cyclingup.osoc.be/api/map/general/bike_infra'
    });

    serviceMap.addLayer({
      id: 'bikeInfra',
      type: 'line',
      source: 'bike_infra',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#888',
        'line-width': 3
      }
    });

    serviceMap.addSource('bike_parking', {
      type: 'geojson',
      data: 'https://api.cyclingup.osoc.be/api/map/general/bike_parking'
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

    serviceMap.addSource('bike_pump', {
      type: 'geojson',
      data: 'https://api.cyclingup.osoc.be/api/map/general/bike_pump'
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

    serviceMap.addSource('bike_shops', {
      type: 'geojson',
      data: 'https://api.cyclingup.osoc.be/api/map/general/bike_shop'
    });

    serviceMap.addLayer({
      id: 'bikeShops',
      type: 'circle',
      source: 'bike_shops',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': 'green',
        'circle-radius': 7
      }
    });

    serviceMap.addSource('bike_villo', {
      type: 'geojson',
      data: 'https://api.cyclingup.osoc.be/api/map/general/bike_villo'
    });

    serviceMap.addLayer({
      id: 'bikeVillo',
      type: 'circle',
      source: 'bike_villo',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': 'orange',
        'circle-radius': 7
      }
    });

    serviceMap.addSource('bike_GFR', {
      type: 'geojson',
      data: 'https://api.cyclingup.osoc.be/api/map/general/bike_icr'
    });

    serviceMap.addLayer({
      id: 'bikeGFR',
      type: 'line',
      source: 'bike_GFR',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': 'red',
        'line-width': 3
      }
    });


  });

  window.addEventListener('load', () => {
    serviceMap.resize();
  });
};
