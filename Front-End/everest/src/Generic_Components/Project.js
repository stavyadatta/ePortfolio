import React from 'react';
import "../ProjectList.css";
import { Link } from "react-router-dom";

function Project(props) {

    return (
      <div className="project">

        <img className="projectImage" src={props.image} alt="projectImage" />
    
        {/* <h2 className="projectName">{props.name}</h2> */}
        <Link to="/profile" className="projectName">{props.name}</Link>       {/*  NEEDS TO BE LINKED TO THE INDIVIDUAL PROJECT PAGE  */}

        <p className="projectDesc">{props.description}</p>

        <p className="projectBody">{props.body}</p>

        <p className="projectTags">{props.tags}</p>
        

      </div>
    );
  }

export default Project;