import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

function BoardForm() {
	const initialState = {
		category: ""
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
		// axiosWithAuth()
		// 	.post("", {
		// 		category: data.category
		// 	})
		// 	.then(res => {
		// 		setData(res);
			
		// 		setData(initialState);
		// 	})
		// 	.catch(err => {
		// 		console.log("error posting data", err);
		// 	});
	};

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<label htmlFor="category">Create a category</label>
				<input
					id="category"
					placeholder="Finance News"
					name="category"
					type="text"
					value={data.name}
					onChange={handleInputChange}
					required
				/>
				<button>Submit</button>
			</form>
		</div>
	);
}

export default BoardForm;

// manage state with reducers between articles and this
