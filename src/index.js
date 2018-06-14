import { h, render } from 'preact';

import registerServiceWorker from './registerServiceWorker';
import App from './components/app';
import './styles/global.css';

registerServiceWorker();

export default App;
