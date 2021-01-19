import React from "react";
import { Link } from "react-router-dom";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: { description : '' } };
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ post: response }))
      .catch(() => this.props.history.push("/posts"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deletePost() {
    const { 
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': "application/json"
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.');
    })
    .then(() => this.props.history.push('/posts'))
    .catch(error => console.log(error.message));
  }

  render() {
    const { post } = this.state;
    let descriptionList = "No descriptions present";

    if (post.description.length > 0) {
      descriptionList = post.description
        .split(",")
        .map((description, index) => (
          <li key={index} className="list-group-item">
            {description}
          </li>
        ));
    }

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={post.image}
            alt={`${post.description} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Description</h5>
                {descriptionList}
                <div>{post.title}</div>
                 <div>${(post.price * .01).toLocaleString()}</div>
              </ul>
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deletePost}>
                Delete Recipe
              </button>
            </div>
          </div>
          <Link to="/posts" className="btn btn-link">
            Back to posts
          </Link>
        </div>
      </div>
    );
  }

}

export default Post;