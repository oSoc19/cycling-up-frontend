import 'normalize.css';
import '../styles/style.scss';

import evolution from './lib/km-evolution';
import commute from './lib/commute-to-work';

const init = () => {
  evolution();
  commute();
};

init();
