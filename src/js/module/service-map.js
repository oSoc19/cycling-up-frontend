import mapboxgl from 'mapbox-gl';

// const jsonData = require("../../assets/data/service-map.json");

const MAP_GENERAL_API_URL = process.env.API_URL + '/map/general/';


let serviceMap;
let mapContainer;
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
  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

  serviceMap = new mapboxgl.Map({
    container: mapContainer,
    style: process.env.MAPBOX_STYLE,
    zoom: 11.5,
    center: [4.355, 50.847]
  });

  window.addEventListener('load', () => {
    serviceMap.resize();
  });

  serviceMap.on('load', () => {
    const layers = serviceMap.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    for (let i = 0;i < layers.length;i += 1) {
      if (layers[i].type === 'symbol') {
        firstSymbolId = layers[i].id;
        break;
      }
    }

    serviceMap.loadImage('../assets/icons/noun_marker.png', function(
      error,
      image
    ) {
      if (error) throw error;
      serviceMap.addImage('Villo!', image);
    });

    serviceMap.loadImage('../assets/icons/noun_parking.png', function(
      error,
      image
    ) {
      if (error) throw error;
      serviceMap.addImage('Parking', image);
    });

    serviceMap.loadImage('../assets/icons/noun_shop.png', function(
      error,
      image
    ) {
      if (error) throw error;
      serviceMap.addImage('Shop', image);
    });

    serviceMap.loadImage('../assets/icons/noun_pump.png', function(
      error,
      image
    ) {
      if (error) throw error;
      serviceMap.addImage('Pump', image);
    });

    showMenuMap();
    ShowBikeInfraLayer();
    showGFRNetworkLayer();
    showVilloStationsLayer();
    ShowBikeParkingLayer();
    showBikeShopsLayer();
    showBikePumpLayer();
  });
};

const showMenuMap = () => {
  const toggleableLayerIds = [
    'bikeVillo',
    'bikeParking',
    'bikePump',
    'bikeShops',
    'bikeInfra',
    'bikeGFR'
  ];

  for (let i = 0;i < toggleableLayerIds.length;i += 1) {
    const id = toggleableLayerIds[i];

    const link = document.createElement('a');
    link.href = '#';
    link.dataset.mapLayer = id;

    link.innerHTML = `<div class=${jsonData[id].line ? 'line' : 'point'}  ${
      jsonData[id].line
        ? `style="background-color: ${jsonData[id].color};"`
        : `style="background-image: url('../assets/icons/${
          jsonData[id].icon
        }.png');"`
    }></div> ${jsonData[id].text}`;

    link.onclick = function(e) {
      const clickedLayer = this.dataset.mapLayer;
      e.preventDefault();
      e.stopPropagation();

      const visibility = serviceMap.getLayoutProperty(
        clickedLayer,
        'visibility'
      );

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

const ShowBikeInfraLayer = () => {
  serviceMap.addSource('bikeInfra', {
    type: 'geojson',
    data: MAP_GENERAL_API_URL + 'bike_infra'
  });

  serviceMap.addLayer(
    {
      id: 'bikeInfra',
      type: 'line',
      source: 'bikeInfra',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        visibility: 'none'
      },
      paint: {
        'line-color': '#203061',
        'line-width': 3
      }
    },
    firstSymbolId
  );
};

const ShowBikeParkingLayer = () => {
  serviceMap.addSource('bikeParking', {
    type: 'geojson',
    data: MAP_GENERAL_API_URL + 'bike_parking'
  });

  serviceMap.addLayer({
    id: 'bikeParking',
    type: 'symbol',
    source: 'bikeParking',
    filter: ['!', ['has', 'point_count']],
    layout: {
      visibility: 'none',
      'icon-image': 'Parking',
      'icon-size': 0.1
    }
  });
};

const showBikePumpLayer = () => {
  serviceMap.addSource('bikePump', {
    type: 'geojson',
    data: MAP_GENERAL_API_URL + 'bike_pump'
  });

  serviceMap.addLayer({
    id: 'bikePump',
    type: 'symbol',
    source: 'bikePump',
    filter: ['!', ['has', 'point_count']],
    layout: {
      visibility: 'none',
      'icon-image': 'Pump',
      'icon-size': 0.1
    }
  });
};

const showBikeShopsLayer = () => {
  serviceMap.addSource('bikeShops', {
    type: 'geojson',
    data: MAP_GENERAL_API_URL + 'bike_shop'
  });

  serviceMap.addLayer({
    id: 'bikeShops',
    type: 'symbol',
    source: 'bikeShops',
    filter: ['!', ['has', 'point_count']],
    layout: {
      visibility: 'none',
      'icon-image': 'Shop',
      'icon-size': 0.13
    }
  });
};

const showVilloStationsLayer = () => {
  serviceMap.addSource('bikeVillo', {
    type: 'geojson',
    data: MAP_GENERAL_API_URL + 'bike_villo'
  });

  serviceMap.addLayer({
    id: 'bikeVillo',
    type: 'symbol',
    source: 'bikeVillo',
    filter: ['!', ['has', 'point_count']],
    layout: {
      visibility: 'none',
      'icon-image': 'Villo!',
      'icon-size': 0.1
    }
  });
};

const showGFRNetworkLayer = () => {
  serviceMap.addSource('bikeGFR', {
    type: 'geojson',
    data: MAP_GENERAL_API_URL + 'bike_icr'
  });

  serviceMap.addLayer(
    {
      id: 'bikeGFR',
      type: 'line',
      source: 'bikeGFR',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        visibility: 'none'
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
