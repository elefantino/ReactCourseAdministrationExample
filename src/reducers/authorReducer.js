import * as types from '../actions/actionTypes';
import initialState from './initialState';

//state=[] refers to authors array that we are going to get
//export default function authorReducer(state = [], action) {
export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;  
    //by default return the state  
    default:
      return state;  
  }
}