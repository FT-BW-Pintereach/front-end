import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { EditCat } from "./EditCat";

function BoardForm() {
	const initialState = {
		name: ""
	};

	const userId = window.localStorage.getItem("id");

	const [categories, setCategories] = useState([]);
	const [data, setData] = useState(initialState);

	const handleInputChange = event => {
		setData({
			...data,
			[event.target.name]: event.target.value
		});
	};

	const fetchCategories = () => {
		axiosWithAuth()
			.get(`categories/${userId}`)
			.then(res => {
				console.log("rendering from get req", res.data);
				setCategories(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}

	const handleFormSubmit = event => {
		event.preventDefault();
		axiosWithAuth()
			.post(`/categories/${userId}`, {
				name: data.name
			})
			.then(res => {
				console.log(res);
				setData(initialState);
			})
			.catch(err => {
				console.log("error posting data", err);
			});
	};

	useEffect(() => {
		fetchCategories();
	}, [data]);
	
	const handleDelete = (id) => {
		axiosWithAuth()
			.delete(`categories/${id}`)
			.then(res => {
				fetchCategories();
			})
			.catch(err => {
				console.log(err);
			});
	}
	
	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<label htmlFor="name">Create a category</label>
				<input
					id="name"
					placeholder="Finance News"
					name="name"
					type="string"
					value={data.name}
					onChange={handleInputChange}
					required
				/>
				<button type="submit">Submit</button>
			</form>
			<div>
				{categories.map(category => {
					return (
						<div key={category.id}>
							<h4>{category.name}</h4>
							<p>list of articles</p>
							<button onClick={() => handleDelete(category.id)}>delete</button>
							<EditCat name={category.name} />
							{/* edit modal pass down name prop */}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default BoardForm;

// manage state with reducers between articles and this


