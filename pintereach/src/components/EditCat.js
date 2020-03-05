import React, { useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { ArticlesContext } from "../contexts/ArticlesContext";



export const EditCat = props => {

	const { fetchCategories } = useContext(ArticlesContext);

	const [cat, setCat] = useState(props.category.name);

	const handleChanges = e => {
		setCat(e.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		axiosWithAuth()
			.put(`/categories/${props.category.id}`, { name: cat })
			.then(res => {
				fetchCategories();
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				id="name"
				// placeholder="Finance News"
				name="name"
				type="string"
				value={cat}
				onChange={handleChanges}
				required
			/>
			<button type="submit">Save</button>
		</form>
	);
};
