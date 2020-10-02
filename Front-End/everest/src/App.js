import React from "react";
import "./App.css";
import LoginPage from "./Login_Page";
import OverviewPage from "./Overview_Page";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Nav from "./Nav";
import FormPage from "./Form_Page";
import Project from "./Project";

function App() {
  
  return (
    <Router>
      <Switch>
        <Route path = "/" exact component = {LoginPage}/>
        <Route path = "/profile" component = {OverviewPage}/>
        <Route path="/addproject" component={Nav} />
        <Route path="/form" component={FormPage} />     
        <Route path="/project" component={Project} />
      </Switch>
    </Router>

  );
  
}

export default App;

