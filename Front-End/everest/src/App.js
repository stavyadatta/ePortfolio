import React from "react";
import "./App.css";
import LoginPage from "./Login_Page";
import OverviewPage from "./Overview_Page";
import MyAccountPage from "./My_Account_Page";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Nav from "./Nav";
import FormPage from "./Form_Page";

function App() {
  
  return (
    <Router>
      <Switch>
        <Route path = "/" exact component = {LoginPage}/>
        <Route path = "/myaccount" exact component = {MyAccountPage}/>
        <Route path = "/profile" component = {OverviewPage}/>
        <Route path="/addproject" component={Nav} />
        <Route path="/form" component={FormPage} />     
      </Switch>
    </Router>

  );
  
}

export default App;

