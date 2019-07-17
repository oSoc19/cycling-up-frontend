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

  window.addEventListener('load', () => {
    serviceMap.resize();
  });

  serviceMap.on('load',  ()  => {


    serviceMap.addSource('bikeInfra', {
      type: 'geojson',
      data: ' https://api.cyclingup.osoc.be/api/map/general/bike_infra'
    });

    serviceMap.addLayer({
      id: 'bikeInfra',
      type: 'line',
      source: 'bikeInfra',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        visibility: 'none'
      },
      paint: {
        'line-color': '#888',
        'line-width': 3
      }
    });

    serviceMap.addSource('bikeParking', {
      type: 'geojson',
      data: 'https://api.cyclingup.osoc.be/api/map/general/bike_parking'
    });

    serviceMap.addLayer({
      id: 'bikeParking',
      type: 'circle',
      source: 'bikeParking',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#2D3E71',
        'circle-radius': 5
      },
      layout: {
        visibility: 'none'
      },
    });

    serviceMap.addSource('bikePump', {
      type: 'geojson',
      data: 'https://api.cyclingup.osoc.be/api/map/general/bike_pump'
    });

    serviceMap.addLayer({
      id: 'bikePump',
      type: 'circle',
      source: 'bikePump',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#EAB818',
        'circle-radius': 10
      },
      layout: {
        visibility: 'none'
      },
    });

    serviceMap.addSource('bikeShops', {
      type: 'geojson',
      data: 'https://api.cyclingup.osoc.be/api/map/general/bike_shop'
    });

    serviceMap.addLayer({
      id: 'bikeShops',
      type: 'circle',
      source: 'bikeShops',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': 'green',
        'circle-radius': 7
      },
      layout: {
        visibility: 'none'
      },
    });

    serviceMap.addSource('bikeVillo', {
      type: 'geojson',
      data: 'https://api.cyclingup.osoc.be/api/map/general/bike_villo'
    });

    serviceMap.addLayer({
      id: 'bikeVillo',
      type: 'circle',
      source: 'bikeVillo',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': 'orange',
        'circle-radius': 7
      },
      layout: {
        visibility: 'none'
      },
    });

    serviceMap.addSource('bikeGFR', {
      type: 'geojson',
      data: 'https://api.cyclingup.osoc.be/api/map/general/bike_icr'
    });

    serviceMap.addLayer({
      id: 'bikeGFR',
      type: 'line',
      source: 'bikeGFR',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        visibility: 'none'
      },
      paint: {
        'line-color': 'red',
        'line-width': 3
      }
    });
  });


  const toggleableLayerIds = ['bikeInfra', 'bikeParking', 'bikePump', 'bikeShops', 'bikeVillo', 'bikeGFR'];
  const json = {
    bikeInfra: {
      text: 'Bike infrastructure',
      icon: false,
      line: true,
      color: '#888',
    },
    bikeParking: {
      text: 'Bike sheds',
      icon: false,
      line: false,
      color: '#2D3E71',
    },
    bikePump: {
      text: 'Bike pumps',
      icon: false,
      line: false,
      color: '#EAB818',
    },
    bikeShops: {
      text: 'Bike shops',
      icon: false,
      line: false,
      color: 'green',
    },
    bikeVillo: {
      text: 'Villo! stations',
      icon: false,
      line: false,
      color: 'orange',
    },
    bikeGFR: {
      text: 'GFR network',
      icon: false,
      line: true,
      color: 'red',
    }
  };

  for (let i = 0;i < toggleableLayerIds.length;i += 1) {
    const id = toggleableLayerIds[i];

    const link = document.createElement('a');
    link.href = '#';
    link.dataset.mapLayer = id;

    link.innerHTML = `<div class=${ json[id].line ? 'line' : 'point'} style="background-color: ${json[id].color};"></div> ${json[id].text}`;

    link.onclick = function (e) {
      const clickedLayer = this.dataset.mapLayer;
      e.preventDefault();
      e.stopPropagation();

      const visibility = serviceMap.getLayoutProperty(clickedLayer, 'visibility');

      if (visibility === 'visible') {
        serviceMap.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
      } else {
        this.className = 'active';
        serviceMap.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      }
    };

    const layers = document.getElementById('menu');
    layers.appendChild(link);
  }
};
