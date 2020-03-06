import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { Reducer, appState } from "./reducers/Reducer";
import { ArticlesContext } from "./contexts/ArticlesContext";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import { Button } from "reactstrap";
// import { useHistory } from "react-router-dom";


import Login from "./components/Login";
import Signup from "./components/Signup";
import Articles from "./components/Articles";
import BoardForm from "./components/BoardForm";
import ArticlesFromCat from "./components/ArticlesFromCat";
import { Navigation } from "./components/Navigation";

import "./App.css";


function App() {

	const userId = window.localStorage.getItem("id");

	// const history = useHistory();

	const [state, dispatch] = useReducer(Reducer, appState);

	const fetchCategories = () => {
		axiosWithAuth()
			.get(`categories/${userId}`)
			.then(res => {
				// console.log("rendering from get categories", res.data);
				dispatch({ type: "FETCH_CATEGORIES", payload: res.data });
			})
			.catch(err => {
				console.log(err);
			});
	};

	const fetchArtFromCat = (id) => {
		axiosWithAuth()
			.get(`/articles/${id}`)
			.then(res => {
				// console.log("fetch art from cat", res.data.art);
				dispatch({ type: "FETCH_USERARTICLES", payload: res.data });
			})
			.catch(err => {
				console.log(err);
			});
	}

	const logOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("id");
		// history.push("/");
	}
	
	return (
		<Router>
			<div className="App">
				{/* <nav className="navbar">
					<Link className="link" to="/articles">
						Articles
					</Link>
					<Link className="link" to="/board">
						My Board
					</Link>
					{window.localStorage.getItem("token") ? (
						<Button onClick={logOut}>Log Out</Button>
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
				</nav> */}
				<Navigation />

				<ArticlesContext.Provider
					value={{ state, dispatch, fetchCategories, fetchArtFromCat }}
				>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route path="/signup" component={Signup} />
						<PrivateRoute path="/board" component={BoardForm} />
						<PrivateRoute path="/articles" component={Articles} />
						<PrivateRoute
							exact
							path="/catart/:id"
							component={ArticlesFromCat}
						/>
					</Switch>
				</ArticlesContext.Provider>
			</div>
		</Router>
	);
}

export default App;
