import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./ProjectList.css";
import "./ProjectList_Casual.css";
import {ReactComponent as Plus}  from "../Icons/add_circle_outline-24px.svg";
import Project from "../Generic_Components/Project";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

function ProjectList(props) {

    const [colour, setColour] = useState("");
    
    const projects = props.projects;

    //placeholder
    if(!projects){
        console.log("loading");
        return (<div>Loading...</div>)
    }



   function createProject(project) {
        if (!project.imgURL) {
            project.imgURL = "https://www.virvelle.com/wp-content/uploads/2018/12/project-management.jpg";
        }
        return (
            <Project 
                key={project.id}
                id={project.id}
                name={project.projectName}
                description={project.projectDesc}
                image={project.imgURL}
            />
        );
    }


    /*******************************************************  COMPONENTS OF THIS PAGE DEFINED BELOW  *****************************************************/


    function getSelectedColour() {

        setColour(document.getElementById("colourPalette").value);

    }

    function ThemeColour() {

        return (

            <div className="themeColour">
                <form>
                    Select Theme Colour:
                    <select id="colourPalette" style={{width:"200px"}}>
                        {/* <option value="0">Select Theme Colour:</option> */}
                        <option value="default">Default</option>
                        <option value="greyBlue">Grey-blue</option>
                        <option value="lightBlue">Light-blue</option>
                        <option value="greenishBlue">Greenish-blue</option>
                    </select>
                </form>

                <button type="button" onClick={getSelectedColour}>Apply Colour</button>
            </div>
   
        );
    }


    function Header(props) {

        return (
            <div id = "project_list_header" style={{ backgroundColor: colour==="greyBlue" ? "#426077" : colour==="lightBlue" ? "#51adcf" : colour==="greenishBlue" ? "#16697a" : "" }}>
    
                <h2 id = "project_list_header_title">{props.name}</h2>       
                         
            </div>
        );
      }
      
    
    function AddProjectsButton() {
        return (

            <Link to="/form">

                <div className="addProject">

                    <Plus className="addProject-icon"/>

                    <button className="addProjectText"> Add Project </button> 

                </div>

            </Link>       
        );
                
            
      }
    
    function GoBackButton() {
        return (

            <Link to="/profile">  

                <div className="goBack">                  
                
                    <i className="far fa-arrow-alt-circle-left" />
                
                    <button className="goBackText"> Go Back </button>

                </div>

            </Link>      
        );
    }


    /***********************************************************************************************************************************************************/


    
    return (

        <div className="page_container" > 
            
            <Header name={"Projects"} />
        
            {/* <div className="projectListButtons"> */}

                
            <AddProjectsButton />

            <GoBackButton />

            {/* <ThemeColour /> */}
            
            {/* </div> */}

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