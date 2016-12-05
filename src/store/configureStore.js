import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
//remove it for the production state. In the development stage, it warns about attempts to immute state,
//however, it's bad for the performance in the production
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}