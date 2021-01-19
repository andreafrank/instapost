import React from "react";
import { Link } from "react-router-dom";

class NewPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
        title: '',
        description: '',
        price: 0
    };

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
	};

	 stripHtmlEntities(str) {
    	return String(str)
     	.replace(/</g, "&lt;")
      	.replace(/>/g, "&gt;");
  	};

  	onChange(e) {
  		this.setState({ [e.target.name]: e.target.value });
  	};

  	onSubmit(e) {
  		e.preventDefault();
      
  		const url = '/api/v1/posts/create';
  		const { title, description, price } = this.state;

  		if ( title.length == 0 || description.length == 0 || price.length == 0)
  			return;

  		const body = { title, description, price };

  		const token = document.querySelector('meta[name="csrf-token"]').content;
    	
    	fetch(url, {
	      method: "POST",
	      headers: {
	        "Content-Type": "application/json",
	        "X-CSRF-Token": token,
	      },
	      body: JSON.stringify(body)
    	})
    		.then(response => {
	         if (response.ok) {
	           return response.json();
	         }
	         throw new Error("Network response was not ok.");
	      })
      	.then(response => this.props.history.push(`/post/${response.id}`))
     		.catch(error => console.log(error.message));
  	}

  	render() {
  		return (
  			<div className="container mt-5">
  				<div className="row">
  					<div className="col-sm-12 col-lg-6 offset-lg-3">
  						<h1 className="font-weight-normal mb-5">
  							Add a new post
  						</h1>
  						<form onSubmit={this.onSubmit}>
  							<div className="form-group">
                  <label htmlFor="postTitle">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="postTitle"
                    className="form-control"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
  								<label htmlFor="postDescription">Post Description</label>
  								<input
  									type="text"
  									name="description"
  									id="postDescription"
  									className="form-control"
  									required
  									onChange={this.onChange}
  								/>
                </div>
                <div className="form-group">
                  <label htmlFor="postPrice">Price</label>
                  <input
                    type="decimal"
                    name="price"
                    id="postPrice"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
  							</div>
  							<button type="submit" className="btn custom-button mt-3">
  								Create Post
  							</button>
  							<Link to="/posts" className="btn btn-link mt-3">
  								Back to posts
  							</Link>
  						</form>
  					</div>	
  				</div>
  			</div>
  		)
  	}
};

export default NewPost;

