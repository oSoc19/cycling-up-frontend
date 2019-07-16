import mapboxgl from 'mapbox-gl';

export default map => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZGFuaWVsbGV0ZXJyYXMiLCJhIjoiY2pqNWhzNGxrMWZmeTN2b2hndWdwenBxdCJ9.YKuXXhdcq1Dks53qu5q-Hw';

  const historicalMap = new mapboxgl.Map({
    container: map,
    style: 'mapbox://styles/danielleterras/cjxoemrlt08nn1cmlm2owey24',
    zoom: 13.5,
    center: [4.355, 50.847]
  });

  window.addEventListener('load', () => {
    historicalMap.resize();
  });
};
