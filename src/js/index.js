import 'normalize.css';
import '../styles/style.scss';

console.log('hello world');

import test from './lib/test';

import index from './index-script';

const init = () => {
  test();
  index();
};

init();
