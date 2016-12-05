/* Testing with Enzyme
*/
import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving) {
  let props = {
    course: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };
  return shallow(<CourseForm {...props} />);
}

//describe block of Mocha is used to group and label the test
describe('CourseForm via Enzyme', () => {
  //1st test: whether the structure of the component is what we expect
  it('renders form and h1', () => {
    const wrapper = setup(false);
    //we expect to find the form and only 1 form
    expect(wrapper.find('form').length).toBe(1);
    //we want to find the tag h1 with the specific text inside
    expect(wrapper.find('h1').text()).toEqual('Manage Course');      
  });

  //2d test: save button
  it('save button is labeled Save when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');       
  });
  it('save button is labeled Saving... when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');       
  });
});  