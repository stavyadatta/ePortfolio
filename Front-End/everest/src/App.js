import React from "react";
import "./App.css";
import LoginPage from "./Login_Page";
import OverviewPage from "./Overview_Page";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  
  return (
    <Router>
      <Switch>
        <Route path = "/" exact component = {LoginPage}/>
        <Route path = "/profile" component = {OverviewPage}/>
      </Switch>
    </Router>

  );
  
  //return (<RegisterPage />);
}

export default App;

