//testing action creators
import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';
//testing thunks
import thunk from 'redux-thunk';
import nock from 'nock'; //mocking HTTP if it's used in actions
import configureMockStore from 'redux-mock-store';

//Testing action creators
describe('Course Actions: createCourseSuccess', () => {
  it('should create a CREATE_COURSE_SUCCESS action', () => {
    //arrange
    const course = {id: 'clean-code', title: 'Clean Code'};
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course: course
    }; 
    //act
    const action = courseActions.createCourseSuccess(course);
    //assert
    expect(action).toEqual(expectedAction);
  });
});  

//Testing thunk
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
    //Here is an example call to nock
    //nock('http://example.com') 
    //  .get('/courses')
    //  .reply(200, {body: {course: [{id:1, firstName: 'Cory', lastName: 'House'}]}}); 
    //arrange
    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code', title: 'Clean Code'}]}}
    ]; 
    const store = mockStore({courses: []}, expectedActions);
    //assert
    store.dispatch(courseActions.loadCourses()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
      done();
    });
  });
});  