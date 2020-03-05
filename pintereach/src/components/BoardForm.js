import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { EditCat } from "./EditCat";
import { ArticlesContext } from '../contexts/ArticlesContext'
import UserNav from "./UserNav.js";
import UserCarousel from "./UserCarousel.js";

function BoardForm(props) {
	const userId = window.localStorage.getItem("id");

	const { state, fetchCategories } = useContext(ArticlesContext);

	const initialState = {
		name: ""
	};

	

	const [data, setData] = useState(initialState);

	// const handleInputChange = event => {
	// 	setData({
	// 		...data,
	// 		[event.target.name]: event.target.value
	// 	});
	// };


	// const handleFormSubmit = event => {
	// 	event.preventDefault();
	// 	axiosWithAuth()
	// 		.post(`/categories/${userId}`, {
	// 			name: data.name
	// 		})
	// 		.then(res => {
	// 			console.log(res);
	// 			setData(initialState);
	// 		})
	// 		.catch(err => {
	// 			console.log("error posting data", err);
	// 		});
	// };

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
		<div className="dot-grid">
			<UserCarousel />
			<UserNav />
			{/* <form onSubmit={handleFormSubmit}>
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
			</form> */}
			<div>
				{state.categories.map(category => {
					return (
						<div key={category.id}>
							<h4 onClick={() => props.history.push(`/catart/${category.id}`)}>
								{category.name}
							</h4>
							<EditCat category={category} />
							<button onClick={() => handleDelete(category.id)}>delete</button>

							{/* edit modal pass down name prop */}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default BoardForm;
// onClick={props.history.push(`/catart/`)}
// manage state with reducers between articles and this


