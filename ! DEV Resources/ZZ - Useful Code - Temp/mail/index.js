import React from 'react';
import ReactDOM from 'react-dom';

import Immutable from 'immutable';
import {HashRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';

import App from './App';
import reducers from './reducers';

const logger = createLogger({
        stateTransformer: (state) => {

            const newState = {};

            for (const i of Object.keys(state)) {

                if (Immutable.Iterable.isIterable(state[i])) {

                    newState[i] = state[i].toJS();
                } else {

            newState[i] = state[i];

                }
      
}

            return newState;
        }
    }),
    store = createStore(reducers, applyMiddleware(logger)),
  app = (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>;
ReactDOM.render(app, document.getElementById('root'));
