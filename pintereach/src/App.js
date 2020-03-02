import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Articles from "./components/Articles";

import './App.css';


function App() {
  
  return (
		<Router>
			<div className="App">
				<h1>Pintereach Project</h1>
        <Switch>
          {/* change login path to home */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {/* change articles component to protected */}
          <Route path="/protected" component={Articles} />
          <Route component={Login} />
          {/* <Route component={Articles} /> */}
				</Switch>
			</div>
		</Router>
	);
}

export default App;
