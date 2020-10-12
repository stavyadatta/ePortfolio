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

// ,
// {
//     "id": "4",
//     "name": "Project_4",
//     "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     "imgURL":"https://project-management.com/wp-content/uploads/2016/11/prepare-for-business-project.jpg",
//     "phone": "+918 372 574"
// }


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