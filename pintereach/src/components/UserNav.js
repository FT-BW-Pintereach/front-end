import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import BoardFormModal from "../components/BoardFormModal.js";
import "./UserNav.css";

const UserNav = props => {
	return (
		
				<div className="user-button">
					<BoardFormModal />
				</div>
	
	);
};

export default UserNav;
