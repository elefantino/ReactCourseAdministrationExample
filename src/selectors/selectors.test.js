//import React from 'react';
import expect from 'expect';
import {authorsFormattedForDropdown} from './selectors';

//Testing dropdown for authors
describe('Author Selectors: authorsFormattedForDropdown', () => {
  it('should return author data formatted for use in a dropdown', () => {
    //define default props to pass it with the class tag
    const authors = [
      {id: 'cory-house', firstName: 'Cory', lastName: 'House'},
      {id: 'scott-allen', firstName: 'Scott', lastName: 'Allen'}
    ]; 
    //expected
    const expected = [
      {value: 'cory-house', text: 'Cory House'},
      {value: 'scott-allen', text: 'Scott Allen'}
    ]; 
    expect(authorsFormattedForDropdown(authors)).toEqual(expected);
  });
});  
