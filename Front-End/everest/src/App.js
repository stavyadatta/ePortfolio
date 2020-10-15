import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import "./App.css";
import LoginPage from "./Login_Page";
import OverviewPage from "./Overview_Page";
import Nav from "./Nav";
import FormPage from "./Form_Page";
import projectDetailsPage from "./Project_Details_Page"
import Navbar from "./Navbar"

import { useSelector } from "react-redux"

function App() {  
  let authState = useSelector(state => state.firebase.auth.uid);
  let routes = {}

  if(authState){
    routes = 
      <Switch>
        <Route path = "/profile" component = {OverviewPage}/>
        <Route path="/projects/:uid" component={Nav} />
        <Route path="/form" component={FormPage} />
        <Route path="/project/:id" component={projectDetailsPage}/>
        <Redirect to = "/profile"/>
      </Switch>
  } else {
    routes = 
      <Switch>
        <Route path="/login" component={LoginPage}/>    
        <Redirect to = "/login"/>
      </Switch>
  }
  return (
    <div>
      <Router>
        <Navbar/>
        {routes}
      </Router>
    </div>
  );  
}

export default App;
