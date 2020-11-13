import React, { useState } from "react";
import "./Form_Page.css";
//import firebase from "../Firebase";
import {useSelector} from "react-redux";
import firebaseUpload from "../storageFirebaseUpload"


// import { Link } from "react-router-dom";
// import { withRouter } from "react-router-dom";
// import {Redirect} from "react-router-dom";



function FormPage(props) {
  const [pName, setPName] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pBody, setPBody] = useState("");
  const [pTags, setPTags] = useState("");      // COULD BE useState([])
  const [isLoading, setLoading] = useState("")
  const userAuth = useSelector(state => state.firebase.auth);
  const userId = userAuth.uid;
  const [imageAsFile, setImageAsFile] = useState('');

  if (isLoading === true) {
    return <div>Loading...</div>}
  else if (isLoading === 'submitted') {
    window.location = '/projects/' + userId;
  }
  const updateField = (e) => {

    let fieldValue = e.target.value;

    if (e.target.id === "name_entry") {
        setPName(fieldValue);
    } 
    if (e.target.id === "desc_entry") {
          setPDesc(fieldValue);
    }
    if (e.target.id === "body_entry") {
          setPBody(fieldValue);
    }
    if (e.target.id === "tags_entry") {
          setPTags(fieldValue);
    }
};
  
  async function handleSubmit (event) {
    setLoading(true);
    event.preventDefault();
    await handleFireBaseUpload(event);
  }


  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(imageFile => (image));
  }

  const handleFireBaseUpload = async e => {
    e.preventDefault();
    
    const projectObject = {
      userId: userId,
      projectName: pName,
      projectDesc: pDesc,
      projectTags: pTags.split(","),
      projectBody: pBody
    };

    await firebaseUpload(imageAsFile, "project-add", projectObject);
    alert("Project has been submitted");
    setLoading("submitted");
  }

  return (

    <div>

        {/************************************************************************/}

        <div className = "container">

            <h2 id="form_header">Project Details</h2>

            <form onSubmit={e => handleSubmit(e)}>
                <label htmlFor="name_entry">Project Name</label>
                <input type="text" id="name_entry" name="projectName" placeholder="Enter Project Name" onChange={updateField} value={pName}/>

                <label htmlFor="desc_entry">Project Description</label>
                <input type="text" id="desc_entry" name="projectDescription" placeholder="Enter Short Description of Project" onChange={updateField} value={pDesc}/>

                <label htmlFor="body_entry">Project Body</label>
                <textarea id="body_entry" name="projectBody" placeholder="Enter Detailed Body of Project" style={{height:"150px"}} onChange={updateField} value={pBody}></textarea>

                <label htmlFor="tags_entry">Project Tags</label>
                <input type="text" id="tags_entry" name="projectTags" placeholder="Enter Project Tags separated by comma" onChange={updateField} value={pTags}/>

                <label htmlFor="main_image_upload">Main Project Image Upload</label>
                <input type="file" id="main_image_upload" name="mainImage" accept="image/*" onChange={handleImageAsFile} />  {/* MIGHT NEED TO USE VALUE PROPERTY LATER INSIDE THIS INPUT TAG*/}

                <input type="submit" id="submitButton" value="Save Project"/>
            </form>
        
        </div>

        {/**************************************************************************/}

    </div>
    
      
  );
}

// export default withRouter(FormPage);      //MIGHT NEED LATER
//export default FormPage;
// const mapStateToProps = (state) => {
//   return {
//       auth:state.firebase.auth
//   };
// };
export default FormPage