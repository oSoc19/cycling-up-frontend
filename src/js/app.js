// import evolution from './module/km-evolution';
import commute from './module/commute-to-work';


let $navDestinationTargets, $mobileMenu, main;

// let $canvasCommute;

const getDomElements = () => {
  $navDestinationTargets = document.querySelectorAll('.js-toggle-menu');
  main = document.querySelector('main');
  $mobileMenu = document.querySelector('.l-header__toggle');
  $mobileMenu.addEventListener('click', onHandlerMenuClick);

  // const canvasCommute = document.getElementById(`js-canvas-commute`);
};

const init = function () {
  getDomElements();
  commute();
};

document.addEventListener('DOMContentLoaded', () => {
  console.info('DOM loaded');
  init();
});


const onHandlerMenuClick = () => {
  $navDestinationTargets.forEach(element => {
    console.log(element);

    element.classList.toggle('is-active');

    if (element.classList.contains('is-active')) {
      main.classList.add('disable-scroll');
    } else {
      main.classList.remove('disable-scroll');
    }

  });
};
