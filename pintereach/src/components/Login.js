import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useForm, ErrorMessage } from 'react-hook-form'

import './SignandLog.css'
const Login = props => {
	const { register, handleSubmit, errors } = useForm()


	const onSubmit = value => {
		axiosWithAuth()
			.post("/auth/login", value)
			.then(res => {
				window.localStorage.setItem("token", res.data.token);
				window.localStorage.setItem("id", res.data.id);
				props.history.push("/articles");
				
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<div>
			<h2>Log in to start browsing articles</h2>
			<form onSubmit={handleSubmit(onSubmit)}  className='form-sign'>
				<label>
					Username
					<input
						type="string"
						placeholder="Username"
						name="username"
						id="username"
						ref={register({
							required: 'Required'
						  })}
					/>
				<ErrorMessage errors={errors} name='username' as='p' className='login-err'/>
				</label>

				<label>
					Password
					<input
						type="password"
						placeholder="Password"
						name="password"
						id="password"
						ref={register({
							required: 'Required'
						  })}
					/>
					<ErrorMessage errors={errors} name='password' as='p' className='login-err'/>
				</label>

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