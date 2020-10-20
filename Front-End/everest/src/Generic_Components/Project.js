import React from 'react';
import { Link } from 'react-router-dom'
import "../Nav.css";

function Project(props) {

    return (
      <div className="project">

        <img className="projectImage" src={props.image} alt="projectImage" />

        <Link to = {"/project/"+props.id} >
          <h2 className="projectName" >{props.name}</h2>
        </Link>

        <p className="projectDesc">{props.description}</p>


      </div>
    );
  }

export default Project;
