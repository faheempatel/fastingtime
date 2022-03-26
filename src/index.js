import { h } from 'preact';
import Router from 'preact-router';

import './styles/global.css';

import App from './routes/App';
import { make as Rules } from './routes/Rules/Rules.bs';

const Main = () => (
  <Router>
    <App path="/" />
    <Rules path="/rules" />
  </Router>
);

export default Main;
