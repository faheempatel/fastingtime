import { h } from 'preact';
import Router from 'preact-router';

import './styles/global.css';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import Rules from 'async!./components/Rules';

registerServiceWorker();

const Main = () => (
  <Router>
    <App path="/" />
    <Rules path="/rules" />
  </Router>
);

export default Main;
