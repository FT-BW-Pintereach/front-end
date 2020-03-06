import React, { useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { ArticlesContext } from "../contexts/ArticlesContext";

import { Input, InputGroup, Button } from "reactstrap";


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
		<form className="edit-form" onSubmit={handleSubmit}>
			<InputGroup>
				<Input
					id="name"
					name="name"
					type="string"
					value={cat}
					onChange={handleChanges}
					required
				/>
				<Button color="info" type="submit">Save</Button>
			</InputGroup>
		</form>
	);
};
