import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input 
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
        {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    
    this.props.createPost(values, () => { // Now inside our action creator so we will be navigated back to our new post!
      this.props.history.push('/'); // This is the route for our programmatic navigation
    });
    // calling bind(this) on the <form> element below to make sure we still have access to this === component
    //console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title For Post"
          name="title"
          component={this.renderField}
         />
         <Field
          label="Categories"
          name="categories"
          component={this.renderField}
         />
         <Field 
          label="Post Content"
          name="content"
          component={this.renderField}
         />
         <button type="submit" className="btn btn-primary">Submit</button>
         <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

//Define validate helper function and pass to redux form, to be called automatically when the user submits. 
//(Values) contains the submit data
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf'}
  const errors= {};

  // Validate the inputs from 'values;
  if (!values.title) {
    errors.title = "Enter a title!";
  }

  if (!values.categories) {
    errors.categories = "Enter some categories!";
  }

  if (!values.content) {
    errors.content = "Enter some content!";
  }
  // if the errors object is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}
// field.meta.error is automatically added to the errors object by redux form

export default reduxForm({
  validate,
  form: 'PostsNewForm'
 }) (
   connect(null,{ createPost })(PostsNew) // This is a great example of combining multiple 'connect' like helpers
); // createPost does render the component and is valid syntax for reduxForm, notice we are passing this in as a 2nd set of ()'s