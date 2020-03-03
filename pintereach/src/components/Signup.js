import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Signup = props => {
	const initialState = {
		username: "",
		password: ""
	};

	const [data, setData] = useState(initialState);

	const handleInputChange = event => {
		setData({
			...data,
			[event.target.name]: event.target.value
		});
	};

	const handleFormSubmit = event => {
		event.preventDefault();
		axiosWithAuth()
			.post("/auth/register", {
				username: data.username,
				password: data.password
			})
			.then(res => {
				console.log("from signup", res);
				window.localStorage.setItem("token", res.data.token);
				props.history.push("/protected");
				// setData(initialState);
			})
			.catch(error => {
				console.log(error);
				setData(initialState);
			});
	};

	return (
		<div>
			<h2>Create an account</h2>
			<form onSubmit={handleFormSubmit}>
				<input
					type="string"
					placeholder="Create Username"
					value={data.username}
					name="username"
					id="username"
					onChange={handleInputChange}
					required
				/>

				<input
					type="password"
					placeholder="Choose Password"
					value={data.password}
					name="password"
					id="password"
					onChange={handleInputChange}
					required
				/>

				<button type="submit">Sign Up</button>
			</form>
			<footer>
				<p>Already have an account?</p>
                <button onClick={() => { props.history.push("/login") }}>Log In</button>
			</footer>
		</div>
	);
};

export default Signup;
