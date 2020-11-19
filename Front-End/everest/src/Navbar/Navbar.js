import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Navbar.css";
import defaultProfile from "../Icons/Default_Profile_Pic.png";
import logo from "../Icons/Everest_logo.png";

function NavBar(props) {
  const imageUrl = props.profile.imgURL?props.profile.imgURL:defaultProfile;

  if (!props.profile.isEmpty && !props.auth.isEmpty) {
    return (
      <LoggedInNavbar
        auth={props.auth}
        profile={props.profile}
        imgUrl={imageUrl}
      />
    );
  } else {
    return <LoggedOutNavbar />;
  }
}

function LoggedInNavbar(props) {
  return (
    <div className="Navbar">
      <div className="navBlock"></div>
      <div className="navContent">
        <div className="navLogo">
          <img src={logo} alt="" />
        </div>
        <div className="NavbarButtons">
          <Link to="/profile">
            <div className="navButton">Home</div>
          </Link>
          <Link to="/myaccount">
            <div className="navButton">My Account</div>
          </Link>
          <Link to={`/mypage/${props.auth.uid}`}>
            <div className="navButton">My Page</div>
          </Link>
          <Link to={`/projects/${props.auth.uid}`}>
            <div className="navButton"> My Projects</div>
          </Link>
        </div>
        <div className="navUser">
          <Link to="/myaccount">
            <div className="navButton">{props.profile.firstName}</div>
          </Link>
          <Link to="/myaccount">
            <img className="navProfilePicture" src={props.imgUrl} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function LoggedOutNavbar() {
  return (
    <div className="Navbar">
      <div className="navBlock"></div>
      <div className="navContent">
        <div className="navLogo">
          <img src={logo} alt="" />
        </div>
        <div className="NavbarButtons"></div>
        <div className="navUser">
          <Link to="/register">
            <div className="navButton" id="sign-up">
              Sign-up
            </div>
          </Link>
          <Link to="/login">
            <div className="navButton" id="login">
              Login
            </div>
          </Link>
        </div>
      </div>
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(NavBar);
