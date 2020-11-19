import React from "react";
import { Link } from "react-router-dom";
import "./ProjectList.css";
import { ReactComponent as Plus } from "../Icons/add_circle_outline-24px.svg";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import NavbarPad from "../Navbar/NavbarPad"
import defaultProjectImage from "../Images/mountain_filler.svg";

function ProjectList_Casual(props) {
  const projects = props.projects;
  const color = "#025E6D";
  const maxDescLength = 580;

  //placeholder
  if (!projects) {
    return <div>Loading...</div>;
  }

  function Project(props) {
    return (
      <div className="project">
        <Link to={"/project/" + props.id}>
            <img className="projectImage" src={props.image} alt="projectImage" style={{borderRadius: "50%", width:"50vh", height: "50vh" }}/>
        </Link>

        <div className="projectNameAndDesc">
          <Link to={"/project/" + props.id}>
            <h2 className="projectName" style={{color:"#DA6D42"}}>{props.name}</h2>
          </Link>

          <p className="projectDesc">{props.description.length > maxDescLength?`${props.description.substring(0, maxDescLength)}...`: props.description}</p>
        </div>

        <p className="projectBody">{props.body}</p>

        <p className="projectTags">{props.tags}</p>
      </div>
    );
  }

  function createProject(project) {
    let imageUrl = project.imgURL ? project.imgURL : defaultProjectImage;

    return (
      <Project
        key={project.id}
        id={project.id}
        name={project.projectName}
        description={project.projectDesc}
        image={imageUrl}
        style={{ border: `1px solid ${color}` }}
      />
    );
  }

  /*******************************************************  COMPONENTS OF THIS PAGE DEFINED BELOW  *****************************************************/

  function Header(props) {
    return (
      <div id="project_list_header" style={{ backgroundColor: color }}>
        <h2 id="project_list_header_title">{props.name}</h2>
      </div>
    );
  }

  function MaybeAddProjectsButton(){
    if(props.match.params.userId === props.auth.uid){
      return(AddProjectsButton())
    } else {
      return (<div className="addProjectButton"/>)
    }
  }

  function AddProjectsButton() {
    return (
      <div className="addProjectButton">
        <Link to="/form">
          <Plus className="addProject-icon" />
          </Link>
          <Link to="/form">
            <button className="addProjectText" style={{ color: color }}>
              Add Project
            </button>
          </Link>
      </div>
    );
  }

  function GoBackButton() {
    return (
        <div className="goBackButton">
          <Link to="/profile">
            <i
              className="far fa-arrow-alt-circle-left"
              style={{ color: color }}
            />

            <button className="goBackText"> Go Back </button>
          </Link>
          
        </div>
    );
  }

  /***********************************************************************************************************************************************************/

  return (
    <div className="page_container">
      <NavbarPad color={color} />
      <Header name={"Projects"} />

      {/* <div className="projectListButtons"> */}

      <div className="projectListButtons">
        <MaybeAddProjectsButton />
        <GoBackButton />
      </div>

      {/* <ThemeColour /> */}

      {/* </div> */}

      <div className="projects">
        {projects.map(createProject)} {/* PROJECTS GETTING RENDERED HERE */}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    let userId = props.match.params.userId;
    return [
      {
        collection: "projects",
        where: [["userId", "==", userId]],
      },
    ];
  })
)(ProjectList_Casual);
