/* This is the rootReducer that combines all the reducers 
*/
import {combineReducers} from 'redux';
//we import courseReducer() function as 'courses', therefore we use 'courses' in combineReducers()
import courses from './courseReducer';
import authors from './authorReducer'; 
import numAjaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  //courses: courses //ES6 allows to use shorthand property names: 
  //when lefthand side = righthand side, we can use just one side
  courses,
  authors,
  numAjaxCallsInProgress
});

export default rootReducer;