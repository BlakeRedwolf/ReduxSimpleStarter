import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from  '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;
    // posts[this.props.match.params.id]; // The post we want to show
    if (!post) {
      return <div>Loading...</div>;
    }

    return(
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
          <h3>{post.title}</h3>
          <h6>Categories: {post.categories}</h6>
          <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) { // ownProps is the object that is heading/going to our class based //component PostsShow above, whenever our component is about the be rendered mapStateToProps is called and is passed all //the props that were headed to that PostsShow
  return { post: posts[ownProps.match.params.id] }; // This will return only the 1 post we are interested in
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow); // Last step for mapStateToProps is to pass it into //our connect function