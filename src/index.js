import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {combineReducers,compose,applyMiddleware,createStore} from 'redux'
import burgerBuilderReducer from './store/reducer/burgerBuilder'
import orderReducer from './store/reducer/order'
import authReducer from './store/reducer/auth'

const rootReducer = combineReducers({
  burgerBuilderReducer:burgerBuilderReducer,
  orderReducer:orderReducer,
  authReducer:authReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
