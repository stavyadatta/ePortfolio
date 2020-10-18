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
  let isInitializing = useSelector(state => state.firebase.isInitializing);
  let isLoadingAuth = useSelector(state => !state.firebase.auth.isLoaded);

  if(isInitializing || isLoadingAuth){
    return(<div>Loading...</div>)
  }

  let routes = {}

  if(authState){
    routes = <AuthRoutes/>;
  } else {
    routes = <UnAuthRoutes/>;
  }
  return (
    <div>
      <Router>
        {routes}
      </Router>
    </div>
  );  
}

function AuthRoutes(){
  return(
    <Switch>
      <Route path = "/profile" component = {OverviewPage}/>
      <NavbarRoutes/>
      <Redirect to = "/profile"/>
    </Switch>
  )
}

function NavbarRoutes(){
  return(
    <div>
      <Navbar/>
      <Switch>
        <Route path="/projects/:uid" component={Nav} />
        <Route path="/form" component={FormPage} />
        <Route path="/project/:id" component={projectDetailsPage}/>
        <Redirect to = "/profile"/>
      </Switch>
    </div>
  )
}

function UnAuthRoutes(){
  return(
    <Switch>
      <Route path="/login" component={LoginPage}/>    
      <Route path="/project/:id" component={projectDetailsPage}/>
      <Redirect to = "/login"/>
    </Switch>
  )
}

export default App;
