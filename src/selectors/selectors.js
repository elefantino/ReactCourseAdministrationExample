//transorm authors array from the state to the form needed for selectInput component 
//(an object with value and text keys)
export function authorsFormattedForDropdown(authors) {
  return authors.map(author => {
    return {
      value: author.id, 
      text: author.firstName + ' ' + author.lastName
    };
  });
}