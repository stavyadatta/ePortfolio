import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import project_image from "./Images/project_image.jpg";
import {ReactComponent as Plus}  from "./Icons/add_circle_outline-24px.svg";

function Nav(props) {
  return (

        <div> 
            <header id = "project_header">
                <h2 id = "project_header_title">Projects</h2>                
            </header>
        
        
            <div className="topButtons">

                <Link to="/form">
                    <div className="addProject">
                   
                        <Plus className="material-icons"/>
                        
                        <a href="#top" className="addProject">
                            Add Project
                        </a>
                    </div>
                </Link>

                <Link to="/profile">
                    <div className="goBack">     {/* Will route back to the Overview Page */}                        
                       
                            <i className="far fa-arrow-alt-circle-left"></i>
                    
                        <a href = "#top" className="goBack">
                            Go Back
                        </a>
                    </div>
                </Link>
            
            </div>

            <div>   
                <ImagePage {...props} />
            </div>
    
        </div>
    
    
  );
}

function ImagePage(props) {
    return (
      <div className="section1">
      {/* {console.log(props.location.state.pName)} */}
      
      {props.location.state ? <img src={props.location.state ? project_image : "whatever.jpg"} className="projectImage1" alt = "proj_image"/> : null }
        
        <div className="project1Text">
          <h2 id="project1header">{props.location.state ? props.location.state.pName : ""}</h2>
          <p id="project1desc">{props.location.state ? props.location.state.pDesc : ""}</p>
        </div>
      </div>
    );
  }

export default Nav;