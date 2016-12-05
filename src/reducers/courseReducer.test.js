import expect from 'expect';
import * as courseActions from '../actions/courseActions';
import courseReducer from './courseReducer';

//Testing Action Creators
describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    //arrange
    const initialState = [
      { title: 'A' },
      { title: 'B' }
    ];
    const newCourse = { title: 'C' };
    const action = courseActions.createCourseSuccess(newCourse);
    //act
    const newState = courseReducer(initialState, action);
    //assert
    expect(newState.length).toEqual(3); //if there are 3 items in the newState
    expect(newState[0].title).toEqual('A'); //if the newState's first item has a title 'A'
    expect(newState[2].title).toEqual('C'); //if the newState's third item has a title 'C'
  });
  it('should update course when passed Update_COURSE_SUCCESS', () => {
    //arrange
    const initialState = [
      {id: 'A', title: 'A'},
      {id: 'B', title: 'B'},
      {id: 'C', title: 'C'}
    ];
    const course = {id: 'B', title: 'New Title'};
    const action = courseActions.updateCourseSuccess(course);
    //act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id == course.id);
    const untouchedCourse = newState.find(a => a.id == 'A');
    //assert
    expect(updatedCourse.title).toEqual('New Title'); 
    expect(untouchedCourse.title).toEqual('A');     
    expect(newState.length).toEqual(3); 
  });
});