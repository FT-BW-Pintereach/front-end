import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

export const Navigation = () => {
	const history = useHistory();

	const logOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("id");
		history.push("/");
	};

	return (
		<nav className="navbar">
			{window.localStorage.getItem("token") ? (
				<>
					<Link className="link" to="/articles">
						Articles
					</Link>
					<Link className="link" to="/board">
						My Board
					</Link>
					<Button onClick={logOut}>Log Out</Button>
				</>
			) : (
				<>
					<Link className="link" to="/">
						Login
					</Link>
					<Link className="link" to="/signup">
						Signup
					</Link>
				</>
			)}
		</nav>
	);
};
