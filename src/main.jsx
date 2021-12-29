import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import '@styles/index.sass';
import App from './app';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
