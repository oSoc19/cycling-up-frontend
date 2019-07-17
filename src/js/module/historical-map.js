import mapboxgl from 'mapbox-gl';

export default map => {
  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

  const historicalMap = new mapboxgl.Map({
    container: map,
    style: 'mapbox://styles/danielleterras/cjxoemrlt08nn1cmlm2owey24',
    zoom: 13.5,
    center: [4.35500, 50.84700]
  });

  window.addEventListener('load', () => {
    historicalMap.resize();
  });
};
