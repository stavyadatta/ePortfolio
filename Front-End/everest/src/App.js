import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import "./App.css";
import LoginPage from "./Login_Page";
import OverviewPage from "./Overview_Page";
import ProjectList from "./ProjectList";
import FormPage from "./Form_Page";
import { useSelector } from "react-redux"


function App() {  
  let authState = useSelector(state => state.firebase.auth.uid);
  let routes = {}

  if(authState){
    routes = 
      <Switch>
        <Route path = "/profile" component = {OverviewPage}/>
        <Route path="/projectlist" component={ProjectList} />
        <Route path="/form" component={FormPage} />     
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
    <Router>
      {routes}
    </Router>

  );  
}

export default App;

