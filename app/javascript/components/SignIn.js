import React from "react";
import { Link } from "react-router-dom";

class SignIn extends React.Component {
	constructor(props) {
		super(props)
		this.state = {email: '', password: ''};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
  		this.setState({ [e.target.name]: e.target.value });
  	};

	onSubmit(e) {
  		e.preventDefault();

  		const url = '/users/sign_in';
  		const { email, password } = this.state;
  		const body = { email, password };
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
	         throw new Error("Something happened. Try again.");
	         console.log(response)
	      })
      	.then(response => this.props.history.push(`/user/${response.id}`))
     		.catch(error => console.log(error.message));
  	}

	render() {
		// let loginStatus = "please sign up or log in";

		return (
				<div>
					<form onSubmit={this.onSubmit}>
					  <label htmlFor="userEmail">Email:</label>
					   	<div>
						   	<input
		                     type="text"
		                     name="email"
		                     id="userEmail"
		                     className="form-control"
		                     required
		                     onChange={this.onChange}
	                  	/>
	                  </div>
	                  <div>
	                  	<label htmlFor="userPassword">Password:</label>
		                  	<input
			                     type="password"
			                     name="password"
			                     id="userPassword"
			                     className="form-control"
			                     required
			                     onChange={this.onChange}
                  			/>
	                  </div>
					  	  	<button type="submit" className="btn custom-button mt-3">
  								sign in
  							</button>
					</form>
				</div>
		)
	}
}

export default SignIn;