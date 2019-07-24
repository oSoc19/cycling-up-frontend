import mapboxgl from 'mapbox-gl';

const serviceJson = require("../../../assets/data/service-map.json");


const MAP_GFR_API_URL = process.env.API_URL + '/map/general/bike_icr';

const MAP_BIKE_STATIONS_URL = process.env.API_URL + '/map/bike_count/historic_stations';

const MAP_BIKE_LIVE_COUNT = "http://data-mobility.brussels/geoserver/bm_bike/wfs?service=wfs&version=1.1.0&request=GetFeature&srsName=EPSG:4326&outputFormat=json&typeName=bm_bike:rt_counting"

let bikeMap;
let firstSymbolId;



export function showMap(container, onSelectStation) {
  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

  bikeMap = new mapboxgl.Map({
    container,
    style: process.env.MAPBOX_STYLE,
    zoom: 11.5,
    center: [4.355, 50.847]
  });

  window.addEventListener('load', () => {
    bikeMap.resize();
  });

  bikeMap.on('load', () => {
    const layers = bikeMap.getStyle().layers;

    // Find the index of the first symbol layer in the map style
    const layer = layers.find(layer => layer.type === 'symbol')
    if (layer) {
      firstSymbolId = layer.id;
    }

    showGFRNetworkLayer();
    showSations();
    showLiveCount();
  });

  // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
  bikeMap.on('click', 'bike_station', (e) => {
    bikeMap.flyTo({ center: e.features[0].geometry.coordinates });
    if (onSelectStation) {
      onSelectStation(e.features[0].id, e.features[0].properties['name']);
    }
  });

  // Change the cursor to a pointer when the it enters a feature in the 'bike_station' layer.
  bikeMap.on('mouseenter', 'bike_station', () => {
    bikeMap.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  bikeMap.on('mouseleave', 'bike_station', () => {
    bikeMap.getCanvas().style.cursor = '';
  });

};

const showGFRNetworkLayer = () => {
  bikeMap.addSource('bikeGFR', {
    type: 'geojson',
    data: MAP_GFR_API_URL
  });

  bikeMap.addLayer(
    {
      id: 'bikeGFR',
      type: 'line',
      source: 'bikeGFR',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#b9cee2',
        'line-width': 3
      }
    },
    firstSymbolId
  );
};



const showSations = () => {

  bikeMap.addSource('bike_stations', {
    type: 'geojson',
    data: MAP_BIKE_STATIONS_URL
  });

  bikeMap.addLayer(
    {
      id: 'bike_station',
      type: 'circle',
      source: "bike_stations",
      filter: ["==", "$type", "Point"],
      paint: {
        'circle-color': '#2d3e71',
        'circle-radius': 13
      }
    },
  );
};

const showLiveCount = () => {

  bikeMap.addSource('bike_live_count', {
    type: 'geojson',
    data: MAP_BIKE_LIVE_COUNT
  });

  bikeMap.addLayer(
    {
      id: 'bike_count',
      type: 'circle',
      source: "bike_live_count",
      filter: ["==", "$type", "Point"],
      paint: {
        "circle-color": "red",
        "circle-radius": [
          "step",
          ["get", "day_cnt"],
          20,
          100,
          30,
          750,
          40
        ]
      }
    },
  );

  bikeMap.addLayer({
    id: 'bike-count-value',
    type: 'symbol',
    source: 'bike_live_count',
    filter: ['has', 'day_cnt'],
    layout: {
      'text-field': '{day_cnt}',
      // 'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 16
    }
  });


};


export function onChangeLanguage(translations) {
  // commuteChart.data.datasets[0].label = translations[lang]['legend']
}
