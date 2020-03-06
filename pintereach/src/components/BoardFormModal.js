import React, { useState, useEffect, useContext } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Label,
	FormGroup
} from "reactstrap";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { ArticlesContext } from "../contexts/ArticlesContext";

import "./BoardFormModal.css";
//  adding category folders
const BoardFormModal = props => {
	const { buttonLabel, className, addCategory } = props;

	//from react-strap
	const [modal, setModal] = useState(false);
	const [unmountOnClose, setUnmountOnClose] = useState(true);
	const toggle = () => setModal(!modal);


	//data state
	const { fetchCategories } = useContext(ArticlesContext);

	const initialState = {
		name: ""
	};

	const [data, setData] = useState(initialState);
	const userId = window.localStorage.getItem("id");

	const handleInputChange = event => {
		setData({
			...data,
			[event.target.name]: event.target.value
		});
	};

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

	return (
		<div className="category-modal">
			<Button color="danger" onClick={toggle} className="modal-button">
				{buttonLabel}New Category
			</Button>
			<Modal
				isOpen={modal}
				toggle={toggle}
				className={className}
				unmountOnClose={unmountOnClose}
			>
				<ModalHeader toggle={toggle}>Create a Category</ModalHeader>
				<form onSubmit={handleFormSubmit}>
					<ModalBody>
						<FormGroup>
							<Label for="name" />
							<Input
								id="name"
								placeholder="Lambda News"
								name="name"
								type="string"
								value={data.name}
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={toggle} type="submit">
							Add
						</Button>{" "}
						<Button color="secondary" onClick={toggle} >
							Cancel
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</div>
	);
};

export default BoardFormModal;
