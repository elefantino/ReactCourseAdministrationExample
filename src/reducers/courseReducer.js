import * as types from '../actions/actionTypes';
import initialState from './initialState';

//state=[] refers to courses array that we are going to get
//export default function courseReducer(state = [], action) {
export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.CREATE_COURSE_SUCCESS:
      //return a copy of the array in the state plus a new object filled with data in action.course
      return [
        ...state, 
        Object.assign({}, action.course)
      ];    
    case types.UPDATE_COURSE_SUCCESS:
      //return a copy of the array in the state without the item to update (filter function)
      //plus a new object filled with data in action.course      
      return [
        ...state.filter(course => course.id !== action.course.id), 
        Object.assign({}, action.course)
      ];      
    //by default return the state  
    default:
      return state;  
  }
}