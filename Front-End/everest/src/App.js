import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./App.css";
import LoginPage from "./Accounts/Login_Page";
import OverviewPage from "./Overview_pages/Overview_Page";
import FormPage from "./Projects/Form_Page";
import ProjectDetailsPage from "./Projects/Project_Details_Page";
import ProjectEditPage from "./Projects/Project_Edit_Page";
import Navbar from "./Navbar/Navbar";
import projectList from "./Projects/ProjectList"
import verifyPage from "./Accounts/Verify_Page";
import MyAccountPage from "./Accounts/My_Account_Page";

import { useSelector } from "react-redux";

function App() {
  //true if auth is loaded and not empty
  let authState = useSelector(
    (state) => !state.firebase.auth.isEmpty && state.firebase.auth.isLoaded
  );

  //true if profile is loaded and not empty
  let profileState = useSelector(
    (state) =>
      !state.firebase.profile.isEmpty && state.firebase.profile.isLoaded
  );

  //true if a logged in user has verified their email
  let emailVerified = useSelector((state) => state.firebase.auth.emailVerified);

  //true when any info is still loading
  let loading = useSelector(
    (state) =>
      !state.firebase.auth.isLoaded ||
      !state.firebase.profile.isLoaded ||
      state.firebase.isInitializing
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  let routes = {};

  if (authState && profileState) {
    if (emailVerified) {
      //Logged in and verified
      routes = <AuthRoutes />;
    } else {
      //Logged in and not verified
      routes = <UnVerifiedRoutes />;
    }
  } else {
    //Logged out
    routes = <UnAuthRoutes />;
  }

  return (
    <div>
      <Router>{routes}</Router>
    </div>
  );
}

function AuthRoutes() {
  return (
    <Switch>
      <Route path="/profile" component={OverviewPage} />
      <Route path="/myaccount" component={MyAccountPage} />
      <NavbarRoutes />
      <Redirect to="/profile" />
    </Switch>
  );
}

function NavbarRoutes() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/form" component={FormPage} />
        <Route path="/project/:id/edit" component={ProjectEditPage} />
        <Route path="/project/:id" component={ProjectDetailsPage} />
        <Route path="/projects/:userId" component={projectList} />
        <Redirect to="/profile" />
      </Switch>
    </div>
  );
}

function UnVerifiedRoutes() {
  return (
    <Switch>
      <Route path="/verify" component={verifyPage} />
      <Redirect to="/verify" />
    </Switch>
  );
}

function UnAuthRoutes() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <div>
        <Navbar />
        <Switch>
          <Route path="/project/:id" component={ProjectDetailsPage} />
          <Route path="/projects/:userId" component={projectList} />
          <Redirect to="/login" />
        </Switch>
      </div>
      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
