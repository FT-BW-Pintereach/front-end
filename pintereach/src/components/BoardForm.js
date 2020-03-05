import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { EditCat } from "./EditCat";
import { ArticlesContext } from "../contexts/ArticlesContext";
import UserNav from "./UserNav.js";
import UserCarousel from "./UserCarousel.js";
import { Collapse, Button, CardBody, Card, Badge } from "reactstrap";
import "./UserHome.css";


function BoardForm(props) {
	
	const { state, fetchCategories, fetchArtFromCat } = useContext(ArticlesContext);

	const initialState = {
		name: ""
	};

	const [data, setData] = useState(initialState);

	// reactstrap
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);
	
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
	
	return (
		<div className="dot-grid">
			<UserCarousel />
			<UserNav />
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
						</Card>
					);
				})}
			</div>
		</div>
	);
}

export default BoardForm;

