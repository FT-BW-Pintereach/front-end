import React,{useState, useContext} from "react";
import { ArticlesContext } from "../contexts/ArticlesContext";

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

export const CategoryButton = () => {

	const [dropdownOpen, setOpen] = useState(false);

	const toggle = () => setOpen(!dropdownOpen);

	const { state } = useContext(ArticlesContext);

	return (
		<div>
			<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle caret color="primary">
					Add Article
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem header>Select a Category</DropdownItem>
					{state.categories.map(category => {
						return <DropdownItem>{category}</DropdownItem>;
					})}
				</DropdownMenu>
			</ButtonDropdown>
		</div>
	);
};
