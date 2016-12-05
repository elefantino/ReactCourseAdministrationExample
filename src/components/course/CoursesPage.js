import React, {PropTypes} from 'react';
//connect function is what we use to create container components that can interact with redux
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
  //constructor is responsible for declaring the state and binding child functions if exist
  constructor(props, context) {
    super(props, context); 
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);   
  }
  //child functions
  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }
  //render html
  render() {
    const {courses} = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input 
          type="submit"
          value="Add course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}
          />
        <CourseList courses={courses} />      
      </div>  
    );
  }
}

//prop type validation
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//redux connect() and related functions

//map a piece of state to props for connect()
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses //state.courses refers to 'courses' in the rootReducer
  };
}

//map actions to props for connect()
function mapDispatchToProps(dispatch) {
  return {
    //bindActionCreators() finds all the actions in courseActions and wraps them in a call to dispatch()
    actions: bindActionCreators(courseActions, dispatch)
  };
}

//here we wrap our CoursesPage component in connect(), which is a higher-order component 
//const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
//export default connectedStateAndProps(CoursesPage);
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); 