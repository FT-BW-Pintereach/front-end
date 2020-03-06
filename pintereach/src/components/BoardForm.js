import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { EditCat } from "./EditCat";
import { ArticlesContext } from "../contexts/ArticlesContext";
import UserNav from "./UserNav.js";
import UserCarousel from "./UserCarousel.js";
import { Collapse, Button, CardBody, Card, Badge } from "reactstrap";
import "./UserHome.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { HeartIcon } from "./HeartIcon";

function BoardForm(props) {
	const { state, fetchCategories, fetchArtFromCat } = useContext(ArticlesContext);

	const [catArticles, setCatArticles] = useState([]);

	const userId = window.localStorage.getItem("id");

	// reactstrap
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const fetchAllCategoryArticles = () => {
		axiosWithAuth()
			.get(`/categories/${userId}/articles`)
			.then(res => {
				// console.log("fetch art from cat", res.data.art);
				setCatArticles(res.data.art)
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchCategories();
		fetchArtFromCat();
		fetchAllCategoryArticles();
	}, []);

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
			<div className="articles-container">
				{state.categories.map(category => {
					return (
						<Card
							body
							outline
							color="info"
							key={category.id}
							className="category-card"
						>
							<CardBody>
								<h4
									onClick={() => props.history.push(`/catart/${category.id}`)}
								>
									{category.name}

									<br />
									<Badge className="badge" color="info">
										{
											catArticles.filter(item => {
												return category.id == item.category_id;
											}).length
										}
									</Badge>
								</h4>
								<HeartIcon />
							</CardBody>

							<Collapse isOpen={isOpen}>
								<EditCat category={category} />
								<Button
									className="delete-button"
									color="danger"
									onClick={() => handleDelete(category.id)}
								>
									<FaRegTrashAlt />
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
