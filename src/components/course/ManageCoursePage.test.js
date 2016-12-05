import React from 'react';
import expect from 'expect';
//shallow only renders one layer deep,
//mount can be used to test this component's interactions with its child components
import {mount, shallow} from 'enzyme'; 
//export of raw ManageCoursePage class rather than the connected class exported by default
//import ManageCoursePage from './ManageCoursePage';
import {ManageCoursePage} from './ManageCoursePage';

//Testing connected components
describe('Manage Course Page', () => {
  it('sets error message when trying to save empty title', () => {
    //define default props to pass it with the class tag
    const props = {
      authors: [],
      actions: {saveCourse: () => {return Promise.resolve();}},
      course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
    }; 
    //create a wrapper 
    //const wrapper = mount(<Provider store={store}><ManageCoursePage/></Provider>);
    const wrapper = mount(<ManageCoursePage {...props} />);
    //we want to test save button
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit'); 
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});  