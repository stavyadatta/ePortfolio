import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import {ReactReduxFirebaseProvider} from "react-redux-firebase"

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store, {rrfprops} from "./Store/index"

ReactDOM.render(
  
    <Provider store={store}>
      <ReactReduxFirebaseProvider config {...rrfprops}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ReactReduxFirebaseProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
