import React,{useState, useContext, useEffect} from "react";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { axiosWithAuth } from '../utils/axiosWithAuth';

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

export const CategoryButton = (props) => {

	
	const [dropdownOpen, setOpen] = useState(false);

	const toggle = () => setOpen(!dropdownOpen);

	const { state, fetchCategories } = useContext(ArticlesContext);

	const addArticle = (id) => {
		console.log("from props", props);
		axiosWithAuth()
			.post(`/articles/${id}`, {
				title: props.article.title,
				description: props.article.description,
				url: props.article.url,
				urlToImage: props.article.urlToImage,
				author: props.article.author
			})
			.then(res => {
				console.log("category button", res)
				
			})
			.catch(err => {
			console.log(err)
		})
	}
	

	useEffect(() => {
		fetchCategories();
	},[])

	return (
		<div>
			<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle caret color="primary">
					Add Article
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem header>Select a Category</DropdownItem>
					{state.categories.map(category => {
						return <DropdownItem onClick={() => addArticle(category.id)}>{category.name}</DropdownItem>;
					})}
				</DropdownMenu>
			</ButtonDropdown>
		</div>
	);
};
