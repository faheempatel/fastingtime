import { render } from 'preact';
import Router from 'preact-router';

import './styles/global.css';

import App from './routes/App';
import Rules from './routes/Rules';

const Main = () => (
  <Router>
    <App path="/" />
    <Rules path="/rules" />
  </Router>
);

render(<Main />, document.getElementById('app'));
