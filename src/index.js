import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
// import {Router, browserHistory} from 'react-router';
// import routes from './routes';
import '../node_modules/semantic-ui/dist/semantic.min.css';
import './assets/styles.css';
import App from './components/App';

render(
    <App />,document.getElementById('app')
);

// render(
//         <Router history={browserHistory} routes={routes} />,
//     document.getElementById('app')
// );