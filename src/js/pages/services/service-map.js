import mapboxgl from 'mapbox-gl';

const serviceJson = require("../../../assets/data/service-map.json");

const MAP_GENERAL_API_URL = process.env.API_URL + '/map/general/';


let serviceMap;
let firstSymbolId;


/**
 * List of the map markers containing the image and their name
 */
const markerImages = [
  {
    url: '../assets/icons/noun_marker.png',
    name: 'Villo!'
  },
  {
    url: '../assets/icons/noun_parking.png',
    name: 'Parking'
  },
  {
    url: '../assets/icons/noun_shop.png',
    name: 'Shop'
  },
  {
    url: '../assets/icons/noun_pump.png',
    name: 'Pump'
  }
];


/**
 * List of layers identified by the API kind of general map
 */

const layers = [
  {
    id: 'bike_infra',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
      visibility: 'none'
    },
    paint: {
      'line-color': '#203061',
      'line-width': 3
    },
    insertToExisting : true
  },
  {
    id: 'bike_parking',
    type: 'symbol',
    filter: ['!', ['has', 'point_count']],
    layout: {
      visibility: 'none',
      'icon-image': 'Parking',
      'icon-size': 0.1
    }
  },
  {
    id: 'bike_pump',
    type: 'symbol',
    filter: ['!', ['has', 'point_count']],
    layout: {
      visibility: 'none',
      'icon-image': 'Pump',
      'icon-size': 0.1
    }
  },
  {
    id: 'bike_shop',
    type: 'symbol',
    filter: ['!', ['has', 'point_count']],
    layout: {
      visibility: 'none',
      'icon-image': 'Shop',
      'icon-size': 0.13
    }
  },
  {
    id: 'bike_villo',
    type: 'symbol',
    filter: ['!', ['has', 'point_count']],
    layout: {
      visibility: 'none',
      'icon-image': 'Villo!',
      'icon-size': 0.1
    }
  },
  {
    id: 'bike_icr',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
      visibility: 'none'
    },
    paint: {
      'line-color': '#b9cee2',
      'line-width': 3
    },
    insertToExisting: true
  }
];



export function showMap (mapContainer) {
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

    const layer = layers.find(l => l.type === 'symbol');
    if (layer) {
      firstSymbolId = layer.id;
    }

    markerImages.forEach(marker => {
      serviceMap.loadImage(marker.url, (error, image) => {
        if (error) throw error;
        serviceMap.addImage(marker.name, image);
      });
    });

    showMenuMap();
    showMapLayers();
  });
};



const showMenuMap = () => {
  const toggleableLayerIds = Object.keys(serviceJson);

  for (let i = 0;i < toggleableLayerIds.length;i += 1) {
    const layerId = toggleableLayerIds[i];
    const service = serviceJson[layerId];

    const link = document.createElement('a');
    link.href = '#';
    link.dataset.mapLayer = layerId;

    link.innerHTML = `<div class=${service.line ? 'line' : 'point'}  ${
      service.line
        ? `style="background-color: ${service.color};"`
        : `style="background-image: url('../assets/icons/${
        service.icon
        }.png');"`
      }></div> ${service.text}`;

    link.onclick = function (e) {
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

    const layersMenu = document.getElementById('menu');
    layersMenu.appendChild(link);
  }
};


const showMapLayers = () => {
  layers.forEach(layer => {
    serviceMap.addSource(layer['id'], {
      type: 'geojson',
      data: MAP_GENERAL_API_URL + layer['id'],
    });

    const { insertToExisting=false} = layer;

    serviceMap.addLayer(
      {
        ...layer,
        source: layer['id']
      },
      insertToExisting ? firstSymbolId : null
    );

  })
}



export function onChangeLanguage(translations) {
  // commuteChart.data.datasets[0].label = translations[lang]['legend']
}
