import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { Reducer, appState } from "./reducers/Reducer";
import { ArticlesContext } from "./contexts/ArticlesContext";
import { axiosWithAuth } from "./utils/axiosWithAuth";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Articles from "./components/Articles";
import BoardForm from "./components/BoardForm";
import UserHome from "./components/UserHome.js";
import ArticlesFromCat from "./components/ArticlesFromCat";

import "./App.css";

function App() {
	const userId = window.localStorage.getItem("id");

	const [state, dispatch] = useReducer(Reducer, appState);

	//Category state
	const [category, setCategory] = useState([
		{
			id: 2,
			name: "Retail"
		},
		{
			id: 3,
			name: "Real Estate"
		}
	]);

	console.log("all categories", category);

	function addCategory(c) {
		const newCategory = {
			id: Date.now(),
			name: c.name
		};
		setCategory([...category, newCategory]);
	}

	const fetchCategories = () => {
		axiosWithAuth()
			.get(`categories/${userId}`)
			.then(res => {
				console.log("rendering from get categories", res.data);
				dispatch({ type: "FETCH_CATEGORIES", payload: res.data });
			})
			.catch(err => {
				console.log(err);
			});
	};

	const fetchArtFromCat = () => {
		axiosWithAuth()
			.get(`/categories/${userId}/articles`)
			.then(res => {
				console.log(res.data.art);
				dispatch({ type: "FETCH_USERARTICLES", payload: res.data.art });
			})
			.catch(err => {
				console.log(err);
			});
	}

	return (
		<Router>
			<div className="App">
				<nav className="navbar">
					<Link className="link" to="/articles">
						Articles
					</Link>
					<Link className="link" to="/board">
						My Board
					</Link>
					{window.localStorage.getItem("token") ? null : (
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

				<ArticlesContext.Provider value={{ state, dispatch, fetchCategories, fetchArtFromCat }}>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route path="/signup" component={Signup} />
						<PrivateRoute path="/board" component={BoardForm} />
						<PrivateRoute exact path="/home">
							<UserHome addCategory={addCategory} />
						</PrivateRoute>
						<PrivateRoute path="/articles" component={Articles} />
						<PrivateRoute
							exact path="/catart/:id"
							component={ArticlesFromCat}
						/>
					</Switch>
				</ArticlesContext.Provider>
			</div>
		</Router>
	);
}

export default App;
