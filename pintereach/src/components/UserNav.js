import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import BoardFormModal from "../components/BoardFormModal.js";
import "./UserNav.css";

const UserNav = props => {
	return (
		<div>
			<Nav className="user-nav">
				<div className="user-links">
					<NavLink href="#">Saved Articles</NavLink>
					<NavLink href="#">My Boards</NavLink>
				</div>
				<div className="user-button">
					<BoardFormModal />
				</div>
			</Nav>
		</div>
	);
};

export default UserNav;
