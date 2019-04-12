import { h } from 'preact';
import Router from 'preact-router';
import AsyncRoute from 'preact-async-route';

import './styles/global.css';
import registerServiceWorker from './registerServiceWorker';

import App from './components/app';

// Preload Rules component
const RulesPromise = import('./components/Rules');

registerServiceWorker();

const Main = () => (
  <Router>
    <App path="/" />
    <AsyncRoute
      path="/rules"
      getComponent={() => RulesPromise.then(module => module.default)}
    />
  </Router>
);

export default Main;
