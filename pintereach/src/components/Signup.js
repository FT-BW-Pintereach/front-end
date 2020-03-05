import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useForm, ErrorMessage } from "react-hook-form";
import "./SignandLog.css";
const Signup = props => {
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = value => {
		axiosWithAuth()
			.post("/auth/register", value)
			.then(res => {
				console.log("from signup!!", res);
				// alert("successfully registered!");
				window.localStorage.setItem("token", res.data.token);
				props.history.push("/");
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<div>
			<h2>Create an account</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="form-sign">
				<label>
					Username
					<input
						type="string"
						placeholder="Create Username"
						name="username"
						id="username"
						ref={register({
							required: "Required",
							pattern: {
								value: /^[a-z0-9_-]{3,16}$/gi,
								message: "Please enter a minimum length of 3"
							}
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="username"
						as="p"
						className="signup-err"
					/>
				</label>

				<label>
					Password
					<input
						type="password"
						placeholder="Choose Password"
						name="password"
						id="password"
						ref={register({
							required: "Required",
							pattern: {
								value: /(?=^.{6,}$)((?=.*\w)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[|!"$%&\/\(\)\?\^\'\\\+\-\*]))^.*/,
								message:
									"Please enter a password that includes at least 6 characters with one uppercase letter, one lowercase letter, one number, and one special character"
							}
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="password"
						as="p"
						className="signup-err"
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>

			<footer>
				<p>Already have an account?</p>
				<button
					onClick={() => {
						props.history.push("/");
					}}
				>
					Log In
				</button>
			</footer>
		</div>
	);
};

export default Signup;
