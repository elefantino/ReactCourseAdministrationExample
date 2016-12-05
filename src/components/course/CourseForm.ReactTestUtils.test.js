/* Testing with React Test Utils
*/
import expect from 'expect';
import React from 'react';
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
  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props} />);
  let output = renderer.getRenderOutput();
  return {
    props,
    output,
    renderer
  };
}

//describe block of Mocha is used to group and label the test
describe('CourseForm via React Test Utils', () => {
  //1st test: whether the structure of the component is what we expect
  it('renders form and h1', () => {
    const {output} = setup(false);
    //form is our top-level tag in CourseForm
    expect(output.type).toBe('form');
    //check the children of the form one by one
    let [h1] = output.props.children;
    expect(h1.type).toBe('h1');       
  });
  //check save button
  it('save button is labeled Save when not saving', () => {
    const {output} = setup(false);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Save');
  });
  it('save button is labeled Saving... when saving', () => {
    const {output} = setup(true);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Saving...');
  });
});