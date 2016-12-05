//Integration test: store + actions + reducers
import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

//Testing store
describe('Store', () => {
  it('should handle creating courses', () => {
    //arrange
    const store = createStore(rootReducer, initialState);
    const course = {
      title: 'Clean code'
    };
    //act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);
    //assert
    const actual = store.getState().courses[0]; //find the first course in the store (what we just added)
    const expected = {
      title: 'Clean code'
    }; 
    expect(actual).toEqual(expected);
  });
});  
