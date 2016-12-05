//it is based on React Redux Container component template
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
//notification lib toastr
import toastr from 'toastr';
import {authorsFormattedForDropdown} from '../../selectors/selectors'

//export of our class allows us to use this class raw rather than the connected class in testing
export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    //set up the local state
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };
    //binding child functions
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }
  //this react lifecycle method is called any time when props might have changed
  componentWillReceiveProps(nextProps) {
    //update the state only if the course's id changed
    if (this.props.course.id !== nextProps.course.id) {
      //it's necessary to populate form when existing course is loaded directly
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }
  //this is a single change handler for all the form fields being changed
  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }
  //validation
  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }
  //save course
  saveCourse(event) {
    //console.log("saving...", this.state.course);
    event.preventDefault();
    //call the validation function
    if (!this.courseFormIsValid()) {
      return;
    }
    //actual saving
    this.setState({saving: true});
    //remember: after saving redirect to courses page via router context
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });    
  }
  //redirection
  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }
  //render
  render() {
    return (
      <CourseForm 
        course={this.state.course} 
        errors={this.state.errors}
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        saving={this.state.saving}
      />
    );
  }
} 

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in React Router context so router is available on this.context.router
//Context is a global variable that React has
ManageCoursePage.contextTypes ={
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);
  if (course) return course[0];
  return null;
}

//!ownProps is a reference to our component's props
function mapStateToProps(state, ownProps) {
  //check our url
  const courseId = ownProps.params.id; //from the path 'course/:id'
  //create an empty course 
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  //if we have courseId and sth in state.courses (checking courses length also makes sure if 
  //courses loading ended), put the course properties into course object to render on the page
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }
  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);