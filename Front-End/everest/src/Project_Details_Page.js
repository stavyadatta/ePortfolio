import React, { useState } from "react";
import "./Project_Details_Page.css";
import { withRouter } from "react-router-dom";

function ProjectDetailsPage(props) {
  const [pName, setPName] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pBody, setPBody] = useState("");
  const [pTags, setPTags] = useState("");
  const [pImg, setPImg] = useState("");

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

    if (e.target.id === "myFile") {
            setPImg(fieldValue);
          }
    return;
  };

  const submitHandler = () => {
   
    props.history.push({pathname:"/addproject",state:{pName:pName, pDesc: pDesc, pBody: pBody, pTags:pTags, PImg: pImg }}); /* CHANGHES TO PROJECT PAGE (WITH DETAILS) WHEN CLICKED ON SAVE PROJECT */
  };

  return (
    <div className="container forms">
      
          <h2 className = "mt-5 mb-3" id="form_header">Project Details</h2>

          {/************************************************************************/}
            <div className = "mt-5 column form-box">
            <form className = "form_fields">
                <div class="form-group">
                   
                    <input className="form-control" type="text" onChange={updateField}  id="name_entry" placeholder="Enter Project Name"/>
                   
                </div>
                <div className="form-group">
                    
                    <input className="form-control" type="text" onChange={updateField}  id="desc_entry" placeholder="Enter Project Description" />
                </div>
                <div className="form-group">
                   
                    <input className="form-control" type="text" onChange={updateField}  id="body_entry"  placeholder="Enter Detailed Body of Project"/>
                </div>
                <div className="form-group">
                    
                    <input className="form-control" type="text" onChange={updateField}  id="tags_entry"  placeholder="Enter Project Tags"/>
                </div>
                <div className="form-group">
                    
                    <input className="form-control" type="file" id="myFile" name="filename" onChange={(event)=> {console.log(event.target.value)}}/>
                </div>
                
                <button style = {{backgroundColor:"#082f4e"}} type="submit" className="mt-4 btn btn-primary" onClick={submitHandler}>Submit</button>
            </form>
           
          </div>

          {/**************************************************************************/}
    </div>  
  );
}

export default withRouter(ProjectDetailsPage);