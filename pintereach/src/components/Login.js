import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";


const Login = props => {
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
			.post("/auth/login", {
				username: data.username,
				password: data.password
			})
			.then(res => {
				// console.log("from login", res);
				window.localStorage.setItem("token", res.data.token);
				window.localStorage.setItem("id", res.data.id);
				props.history.push("/articles");
				
			})
			.catch(error => {
				console.log(error);
				setData(initialState);
			});
	};

	return (
		<div>
			<h2>Log in to start browsing articles</h2>
			<form onSubmit={handleFormSubmit}>
				<input
					type="string"
					placeholder="Username"
					value={data.username}
					name="username"
					id="username"
					onChange={handleInputChange}
					required
				/>

				<input
					type="password"
					placeholder="Password"
					value={data.password}
					name="password"
					id="password"
					onChange={handleInputChange}
					required
				/>

				<button type="submit">Log In</button>
			</form>
			<footer>
				<p>Don't have an account yet?</p>
				<button
					onClick={() => {
						props.history.push("/signup");
					}}
				>
					Sign Up
				</button>
			</footer>
		</div>
	);
};

export default Login;