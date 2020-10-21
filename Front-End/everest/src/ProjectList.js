import React from "react";
import { Link } from "react-router-dom";
import "./ProjectList.css";
import {ReactComponent as Plus}  from "./Icons/add_circle_outline-24px.svg";
import Project from "./Generic_Components/Project";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

function ProjectList(props) {
    const projects = props.projects;

    //placeholder
    if(!projects){
        console.log("loading");
        return (<div>Loading...</div>)
    }



  function createProject(project) {
    if (project.imgURL == undefined) {
        project.imgURL = "https://www.virvelle.com/wp-content/uploads/2018/12/project-management.jpg";
    }
    return (
    <Project 
        key={project.id}
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

                {projects.map(createProject)}    {/* PROJECTS GETTING RENDERED HERE */}
                 
            </div>
    
        </div>
    
    
  );
}


const mapStateToProps = (state, ownProps) => {
    return {
        projects:state.firestore.ordered.projects 
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        let userId = props.match.params.userId;
        return [
            {
                collection: "projects",
                where:[["userId", "==", userId]]
            }
        ];
    })
)(ProjectList);
//export default ProjectList;