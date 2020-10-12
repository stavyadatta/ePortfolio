import React, { useState } from "react";
import "./Form_Page.css";
import { withRouter } from "react-router-dom";
import EntryBox from "./Generic_Components/Entry_Box";

import firebase from "./Firebase"

function FormPage(props) {
  const [pName, setPName] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pBody, setPBody] = useState("");
  const [pTags, setPTags] = useState("");
  //const [pImg, setPImg] = useState("");

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
    if (e.target.id === "myFile") {
            //setPImg(fieldValue);
          }
    

    return;
  };

  const submit = () => {
    console.log(pName, pDesc, pBody, pTags);
    firebase.functions().httpsCallable('project-add')({
      projectName:pName, 
      projectDesc:pDesc, 
      projectBody:pBody, 
      projectTags:pTags.split(','),
      userId:firebase.auth().currentUser.uid
    }).then(res=>console.log(res)).catch(e=>console.error(e));
   
    //props.history.push({pathname:"/addproject",state:{pName:pName, pDesc: pDesc, pBody: pBody, pTags:pTags, PImg: pImg }}); /* CHANGHES TO PROJECT PAGE (WITH DETAILS) WHEN CLICKED ON SAVE PROJECT */
  };

  return (
    <div className="container forms">
      
          <h2 className = "mt-5 mb-3" id="form_header">Project Details</h2>

          {/************************************************************************/}
            <div className = "mt-5 column form-box">
            <EntryBox id = "name_entry" textType = "text" 
    	  	  default = "Project name"
        	  onChange = {updateField} />
            <EntryBox id = "desc_entry" textType = "text" 
    	  	  default = "Project description"
        	  onChange = {updateField} />
            <EntryBox id = "body_entry" textType = "text" 
    	  	  default = "Project body"
        	  onChange = {updateField} />
            <EntryBox id = "tags_entry" textType = "text" 
    	  	  default = "Project tags"
        	  onChange = {updateField} />
            <button onClick={submit}>Submit</button>
              
            
           
          </div>

          {/**************************************************************************/}
    </div>
    
      
  );
}

export default withRouter(FormPage);





// function DescriptionComponents(props) {
//   return (
//     <div className="desc_elements">
//       <EntryBox
//         id="desc_entry"
//         textType="text"
//         default="Enter Project Description"
//         onChange={props.onChange}
//       />
//     </div>
//   );
// }

// function ProjectBody() {
//   return (
//     <div className="body_elements">
//       <EntryBox
//         name="body"
//         id="body_entry"
//         textType="text"
//         default="Enter Detailed Body of Project"
//       />
//     </div>
//   );
// }

// function Tags(props) {
//   return (
//     <div className="tags_elements">
//       <EntryBox
//         id="tags_entry"
//         textType="text"
//         default="Enter Tags for the Project"
//         onChange={props.onChange}
//       />
//     </div>
//   );
// }

// function FileUpload() {
//   return (
//     <div className="file_elements">
//       <input type="file" id="myFile" name="filename" />
//     </div>
//   );
// }

// function SubmitComponents(props) {
//   return (
//     <div className="submit_elements">
//       <input type="submit" onClick={props.submitHandler} />
//     </div>
//   );
// }