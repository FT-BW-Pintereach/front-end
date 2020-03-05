import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { EditCat } from "./EditCat";
import { ArticlesContext } from "../contexts/ArticlesContext";
import UserNav from "./UserNav.js";
import UserCarousel from "./UserCarousel.js";
import { Collapse, Button, CardBody, Card, Badge } from "reactstrap";


function BoardForm(props) {
	
	const { state, fetchCategories, fetchArtFromCat } = useContext(ArticlesContext);

	const initialState = {
		name: ""
	};

	const [data, setData] = useState(initialState);

	// reactstrap
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);
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
		fetchArtFromCat();
	}, [data]);

	const handleDelete = id => {
		axiosWithAuth()
			.delete(`categories/${id}`)
			.then(res => {
				fetchCategories();
			})
			.catch(err => {
				console.log(err);
			});
	};

	// const catId = state.categories.map(category => {
	// 	return category.id
	// })

	//  const filtered = state.userArticles.filter(item => {
	// 		return catId == item.category_id;
	// 	});
	
	// console.log("filtered", filtered);
	
	console.log("check here", state);
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
			<Button color="primary" onClick={toggle}>
				Edit Categories
			</Button>
			<div>
				{state.categories.map(category => {
					return (
						<Card body outline color="info" key={category.id}>
							<CardBody>
								<h4
									onClick={() => props.history.push(`/catart/${category.id}`)}
								>
									{category.name}
									<Badge color="secondary">{state.userArticles.filter(item => {
										return category.id == item.category_id;
									}).length}
									</Badge>
								</h4>
							</CardBody>

							<Collapse isOpen={isOpen}>
								<EditCat category={category} />
								<Button
									color="danger"
									onClick={() => handleDelete(category.id)}
								>
									Delete
								</Button>
							</Collapse>

							{/* edit modal pass down name prop */}
						</Card>
					);
				})}
			</div>
		</div>
	);
}

export default BoardForm;
// onClick={props.history.push(`/catart/`)}
// manage state with reducers between articles and this
