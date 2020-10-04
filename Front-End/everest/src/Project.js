import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
//import Form from "./Form";

function Project() {
  return (
    
    <div>
      <header>
        <h2>Projects</h2>
        {/* <nav>
          <input type="text" id="search" placeholder="Search for Projects..." />
        </nav> */}
      </header>
      <Link to={"/form"}>
        <div className="topButtons">
          <div className="addProject">
            <a href="#">
              <i className="material-icons">add_circle_outline</i>
            </a>
            <a href="#" className="addProject">
              Add Project
            </a>
          </div>
          <div className="goBack">
            {/* Will take us to the Overview Page */}
            <a href="#">
              <i className="far fa-arrow-alt-circle-left"></i>
            </a>
            <a href="#" className="goBack">
              Go Back
            </a>
          </div>
        </div>
      </Link>

      <ImagePage />
    </div>
  );
}

function ImagePage() {
  return (
    <div className="section1">
      <img className="projectImage1" alt="" />
      <div className="project1Text">
        <h2 id="project1header">Project 1</h2>
        <p id="project1para">Project description</p>
      </div>
    </div>
  );
}

export default Project;