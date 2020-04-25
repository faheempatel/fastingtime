import { h } from 'preact';
import Router from 'preact-router';

import './styles/global.css';

import App from './routes/App';
import Rules from 'async!./routes/Rules';

const Main = () => (
  <Router>
    <App path="/" />
    <Rules path="/rules" />
  </Router>
);

export default Main;
