import React from "react";

class SignUp extends React.Component {
	constructor(props) {
		super(props)
		this.handleSignup = this.handleSignup.bind(this);
	}

	handleSignup(e) {
		e.preventDefault();
		axios.post('/users,' {
			user: {
				email: document.getElementbyId("email").value,
				password: document.getElementbyId("password").value,
				password_confirmation: document.getElementbyId("password_confirmation").value
			}
		})
		.then(function(response) {
			this.props.changePage('delete');
			this.props.updateCurrentUser(email);
		})
		.catch(function(error){
			console.log(error)
		})
	}

	render() {
		return (
			<div>
				<h2>signup</h2>
				<form>
					<input id="email" placeholder="email" />
					<input id="password" placeholder="password" />
					<input id="password_confirmation" placeholder="retype password" />

					<button onClick={this.handleSignup}>submit</button>
				</form>
				<button onClick={() => this.props.changePage('login')}>back to login</button>
			</div>
		)
	}
}

export default SignUp;