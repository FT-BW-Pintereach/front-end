import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { Reducer, appState } from "./reducers/Reducer";
import { ArticlesContext } from "./contexts/ArticlesContext";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Articles from "./components/Articles";
import BoardForm from "./components/BoardForm";

import "./App.css";
import { Nav,	NavItem, NavLink } from "reactstrap";


function App() {
	const [state, dispatch] = useReducer(Reducer, appState);

	return (
		<Router>
			<div className="App">
				<nav className="navbar">
					<Link className="link" to="/articles">
						Articles
					</Link>
					<Link className="link" to="board">
						My Board
					</Link>
					{window.localStorage.getItem("token") ? null : (
						<>
							<Link className="link" to="/">
								Login
							</Link>
							<Link className="link" to="signup">
								Signup
							</Link>
						</>
					)}
				</nav>
				<ArticlesContext.Provider value={{ state, dispatch }}>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route path="/signup" component={Signup} />
						<PrivateRoute path="/board" component={BoardForm} />
						<PrivateRoute path="/articles" component={Articles} />
					</Switch>
				</ArticlesContext.Provider>
			</div>
		</Router>
	);
}

export default App;
