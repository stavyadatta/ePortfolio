import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Navbar.css'

function NavBar(props){
    if(!props.profile.isEmpty && !props.auth.isEmpty){
        return (<LoggedInNavbar auth={props.auth} profile={props.profile}/>)
    } else {
        return (<LoggedOutNavbar/>)
    }
}

function LoggedInNavbar(props){
    return(
        <div className="Navbar">
            <div className="navLogo">
                <div className="navButton">logogohere</div>
            </div>
            <div className="NavbarButtons">
                <Link to = "/">
                    <div className="navButton">Home</div>
                </Link>
                <Link to="/profile">
                    <div className="navButton">My Account</div>
                </Link>
                <Link to="/profile">
                    <div className="navButton">My Page</div>
                </Link>
                <Link to={"/projects/"+props.auth.uid}>
                    <div className="navButton"> My Projects</div>
                </Link>
            </div>
            <div className="navUser">
                <Link to="/profile">
                    <div className="navButton">{props.profile.name}</div>
                </Link>
            </div>
        </div>
    )
}

function LoggedOutNavbar(){
    return(
        <div className="Navbar">
            <div className="navLogo">
                <Link to="/">
                    <div className="navButton">logogohere</div>
                </Link>
            </div>
            <div className="NavbarButtons"></div>
            <div className="navUser">
                <Link to="/login">
                    <div className="navButton" id="sign-up">Sign-up</div>
                </Link>
                <Link to="/login">
                    <div className="navButton" id="login">Login</div>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
	};
};


export default connect(mapStateToProps)(NavBar);
