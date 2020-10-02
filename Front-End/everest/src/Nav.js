import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
//import Form from "./Form";

function Nav() {
  return (
    <div>
      <header>
        <h2 id = "project_header">Projects</h2>
        {/* <nav>
          <input type="text" id="search" placeholder="Search for Projects..." />
        </nav> */}
      </header>
      
        <div className="topButtons">
        <Link to="/form">
          <div className="addProject">
            <a href="#">
              <i className="material-icons">add_circle_outline</i>
            </a>
            <a href="#" className="addProject">
              Add Project
            </a>
          </div>
        </Link>

        <Link to="/form">
          <div className="goBack">
            {/* Will take us to the Overview Page */}
            <a href="#">
              <i className="far fa-arrow-alt-circle-left"></i>
            </a>
            <a href="#" className="goBack">
              Go Back
            </a>
          </div>
        </Link>
        </div>
      
    </div>
  );
}

export default Nav;