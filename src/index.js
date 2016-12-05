import 'babel-polyfill';  
import React from 'react';
import {render} from 'react-dom';
//browserHistory gives clean urls
import {Router, browserHistory} from 'react-router';  
//Provider component wraps the entire app (in our case, Router component),
//so that the app (and all its components) can be connected to our redux store
import {Provider} from 'react-redux';  
import configureStore from './store/configureStore';
import routes from './routes';
//import actions
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
//import styles
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

//create an instance of our store
const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,  
  document.getElementById('app')
);  