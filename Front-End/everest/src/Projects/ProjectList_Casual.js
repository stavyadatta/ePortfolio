import React from "react";
import { Link } from "react-router-dom";
import "./ProjectList.css";
import { ReactComponent as Plus } from "../Icons/add_circle_outline-24px.svg";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

function ProjectList_Casual(props) {
  const projects = props.projects;

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

          <p className="projectDesc">{props.description}</p>
        </div>

        <p className="projectBody">{props.body}</p>

        <p className="projectTags">{props.tags}</p>
      </div>
    );
  }

  function createProject(project) {
    if (!project.imgURL) {
      project.imgURL =
        "https://www.virvelle.com/wp-content/uploads/2018/12/project-management.jpg";
    }
    return (
      <Project
        key={project.id}
        id={project.id}
        name={project.projectName}
        description={project.projectDesc}
        image={project.imgURL}
        style={{ border: "1px solid #025E6D" }}
      />
    );
  }

  /*******************************************************  COMPONENTS OF THIS PAGE DEFINED BELOW  *****************************************************/

  function Header(props) {
    return (
      <div id="project_list_header" style={{ backgroundColor: "#025E6D" }}>
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
            <button className="addProjectText" style={{ color: "#082f4e" }}>
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
              style={{ color: "#025E6D" }}
            />

            <button className="goBackText"> Go Back </button>
          </Link>
          
        </div>
    );
  }

  /***********************************************************************************************************************************************************/

  return (
    <div className="page_container">
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
