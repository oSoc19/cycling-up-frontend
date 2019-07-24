import mapboxgl from 'mapbox-gl';

const HISTO_MAP_URL = process.env.API_URL + '/map/historical/';
let historicalMap;
let yearsData;
let last = 0;
let yearIndex = - 1;
let firstSymbolId;
let animationInfra;

const $yearLabel = document.querySelector('.js-year-label');
const $nextButton = document.querySelector('.js-btn-next');
const $previousButton = document.querySelector('.js-btn-prev');
const $pauseButton = document.getElementById('pause');


const fetchData = () => {
  return fetch(`${HISTO_MAP_URL}years`).then(r => r.json());
};

const  init = () => {
  return fetchData().then(data => startAnimation(data)).then(
    _=> {
      $pauseButton.addEventListener('click', () => {
        $pauseButton.classList.toggle('pause');
        if ($pauseButton.classList.contains('pause')) {
          cancelAnimationFrame(animationInfra);
          $nextButton.classList.remove('is-hidden');
          $previousButton.classList.remove('is-hidden');
        } else {
          renderAnimation();
          $nextButton.classList.add('is-hidden');
          $previousButton.classList.add('is-hidden');
        }
      });


      $nextButton.addEventListener('click', () => { showNextLayer(); });

      $previousButton.addEventListener('click', () => {
        toggleLayer(yearsData[yearIndex], false);
        yearIndex --;
        if (yearIndex === - 1) {
          yearIndex = yearsData.length - 1;
          yearsData.forEach(element => {
            toggleLayer(element, true);
          });
        }
        $yearLabel.innerHTML = yearsData[yearIndex];
      });

    }
  );
};

const startAnimation = data => {
  yearsData = data.sort();
  yearsData.forEach(element => {
    addLayerToMap(element);
  });
  renderAnimation();
};

const renderAnimation =  now => {
  if (now !== undefined && !last || now - last >= 1 * 1000) {
    last = now;
    showNextLayer();
  }
  animationInfra = requestAnimationFrame(renderAnimation);
};

export function showMap(container) {
  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

  historicalMap = new mapboxgl.Map({
    container,
    style: process.env.MAPBOX_STYLE,
    zoom: 10.6,
    center: [4.35500, 50.82700]
  });

  historicalMap.on('load', () => {
    const layers = historicalMap.getStyle().layers;

    const layer = layers.find(l => l.type === 'symbol');
    if (layer) {
      firstSymbolId = layer.id;
    }

    init();
  });

  window.addEventListener('load', () => {
    historicalMap.resize();
  });
}

const addLayerToMap = year => {
  const historicalLayerSource = `api_cycling_historical_map_${year}`;
  const mapLayer = historicalMap.getLayer(historicalLayerSource);
  if (typeof mapLayer == 'undefined') {
    historicalMap.addSource(historicalLayerSource, {
      type: 'geojson',
      data: HISTO_MAP_URL + year
    });
    historicalMap.addLayer({
      id: historicalLayerSource,
      type: 'line',
      source: historicalLayerSource,
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        visibility: 'none'
      },
      paint: {
        'line-color': '#EAB818',
        'line-width': 3
      }
    }, firstSymbolId);

    return true;
  }
};

const toggleLayer = (year, ishidden) => {
  const  layerSource = `api_cycling_historical_map_${year}`;
  historicalMap.setLayoutProperty(layerSource, 'visibility', ishidden ? 'visible' : 'none');
};


const showNextLayer = () => {
  yearIndex ++;
  if (yearIndex === yearsData.length) {
    yearIndex = 0;
    yearsData.forEach(element => {
      toggleLayer(element, false);
    });
  }
  $yearLabel.innerHTML = yearsData[yearIndex];
  toggleLayer(yearsData[yearIndex], true);
};



export function onChangeLanguage(lang, translations) {

}
