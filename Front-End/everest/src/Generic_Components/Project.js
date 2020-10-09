import React from 'react';
import "../Nav.css";

function Project(props) {

    return (
      <div className="project">

        <img className="projectImage" src={props.image} alt="projectImage" />

    
        <h2 className="projectName">{props.name}</h2>

        <p className="projectDesc">{props.description}</p>


      </div>
    );
  }

export default Project;

// function Project(props) {
//     return (
//       <div className="section1">
//       {/* {console.log(props.location.state.pName)} */}
      
//       {props.location.state ? <img src={props.location.state ? project_image : "whatever.jpg"} className="projectImage1" alt = "proj_image"/> : null }
        
//         <div className="project1Text">
//           <h2 id="project1header">{props.location.state ? props.location.state.pName : ""}</h2>
//           <p id="project1desc">{props.location.state ? props.location.state.pDesc : ""}</p>
//         </div>
//       </div>
//     );
//   }