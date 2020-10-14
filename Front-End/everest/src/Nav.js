import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Plus }  from "./Icons/add_circle_outline-24px.svg";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import "./Nav.css";
import Project from "./Generic_Components/Project";

function Nav(props) {
    console.log(props)

  function createProject(project) {
      return (
        <Project 
            id={project.id}
            name={project.projectName}
            description={project.projectDesc}
            image={project.imgURL}
        />
      );
  }

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

            <div className="projects"> 

                {props.projects.map(createProject)}    {/* PROJECTS GETTING RENDERED HERE */}
                 
            </div>
    
        </div>
    
    
  );
}

const mapStateToProps = (state)=>{
    return {
        projects: state.firestore.ordered.projects
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props=>{
        return [
        {collection:'projects', where:['userId', '==', props.match.params.uid]}
    ]})
) (Nav);