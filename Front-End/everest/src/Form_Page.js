import React, { useState } from "react";
import "./Form_Page.css";
import EntryBox from "./Generic_Components/Entry_Box";
import { withRouter } from "react-router-dom";

function FormPage(props) {
  const [pName, setPName] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pBody, setPBody] = useState("");
  const [pTags, setPTags] = useState("");

  const updateField = (e) => {
      console.log(pName, pDesc, pBody, pTags);
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
    return;
  };

  const submitHandler = () => {
    props.history.push("/project"); /* CHANGHES TO PROJECT PAGE (WITH DETAILS) WHEN CLICKED ON SAVE PROJECT */
  };

  return (
    <div className="forms">
      <div className="form_page">
        <div className="form_fields_container">
          <h2 id="form_header">Project Details</h2>

          {/************************************************************************/}

          <form className="user_inputs" onSubmit={submitHandler}>
            <EntryBox
              id="name_entry"
              textType="text"
              default="Enter Project Name"
              onChange={updateField}
            />
            <DescriptionComponents onChange={updateField} />
            <ProjectBody />
            <Tags />
            <FileUpload />
            <SubmitComponents />
          </form>

          {/**************************************************************************/}
        </div>
      </div>
    </div>
  );
}

// function Fields(props) {

//   return (

//   );
// }

function DescriptionComponents(props) {
  return (
    <div className="desc_elements">
      <EntryBox
        id="desc_entry"
        textType="text"
        default="Enter Project Description"
        onChange={props.onChange}
      />
    </div>
  );
}

function ProjectBody() {
  return (
    <div className="body_elements">
      <EntryBox
        name="body"
        id="body_entry"
        textType="text"
        default="Enter Detailed Body of Project"
      />
    </div>
  );
}

function Tags(props) {
  return (
    <div className="tags_elements">
      <EntryBox
        id="tags_entry"
        textType="text"
        default="Enter Tags for the Project"
        onChange={props.onChange}
      />
    </div>
  );
}

function FileUpload() {
  return (
    <div className="file_elements">
      <input type="file" id="myFile" name="filename" />
    </div>
  );
}

function SubmitComponents() {
  return (
    <div className="submit_elements">
      <input type="submit" />
    </div>
  );
}

export default withRouter(FormPage);