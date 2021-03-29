import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import auth from './store/reducers/auth';
import data from './store/reducers/data';

import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';



const rootReducer=combineReducers({
  auth:auth,
  data:data
});


let composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename='todoListV2_React_withAuth'>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();