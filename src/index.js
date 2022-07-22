import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


// if ('serviceWorker' in navigator)
//       navigator.serviceWorker.register('./sw.js');
//     else{
//         console.error('sw not working');
//     }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}><App /></Provider> 
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
