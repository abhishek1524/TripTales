import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'; //we initialize redux from here.(redux is used to perform operations on backend.)
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';

import App from './App';
import './index.css'

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(        //through all these above line and provider line below we succesfully connect to redux and now can use its capabilities.
    <Provider store={store}>            
        <App />
    </Provider>,
     document.getElementById('root'));

