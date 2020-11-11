import React, { useState } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import firebase from "../Firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { ProjectDetailList } from "./Project_Edit_Details";
import { SubmitButton, AddDetailButton} from "./Project_Edit_Buttons";

import "./Project_Details_Page.css";
import defaultProjectImage from "../Images/project_image.jpg";

const defaultPalette = {
  primary: "#082F4E",
  secondary: "#FFFFFF",
  detail: "#a5a5a5",
};

//Material Ui themeing
const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(1),
    width: "10ch",
  },
  bodyText: {
    margin: theme.spacing(1),
    width: "100%",
  },
  halfBodyText: {
    margin: theme.spacing(1),
    width: "50%",
  },
  resize: {
    fontSize: "small",
  },
  input: {
    color: "white",
  },
}));

function ProjectEditPage(props) {
  let project = props.project;
  let details = props.projectDetails;

  const handleAddDetail = () => {
    let nDetails = project.nDetails?project.nDetails:0;
    //Add detail document
    firebase.firestore()
    .collection("projectDetails")
    .add({
      projectId:props.match.params.id,
      type:"default",
      position:nDetails,
    })

    //update project
    firebase.firestore()
    .collection('projects')
    .doc(props.match.params.id)
    .update({nDetails:nDetails+1})
  }

  const handleDeleteDetail = (detailId) => {
    let nDetails = project.nDetails;
    let detColRef =firebase.firestore().collection("projectDetails")

    //delete detail
    detColRef.doc(detailId).delete();

    //update project
    firebase.firestore()
    .collection('projects')
    .doc(props.match.params.id)
    .update({nDetails:nDetails-1})

    //update other detail positions
    let pos = 0;
    details.forEach(detail => {
      if(detail.id!==detailId){
        detColRef.doc(detail.id).update({position:pos});
        pos++;
      }
    });
    

  }

  let classes = useStyles();

  //check if data is loaded
  if (!project || !details) {
    return <div>Loading...</div>;
  }


  let imageUrl = project.imgURL ? project.imgURL : defaultProjectImage;
  let palette = project.colourPalette ? project.colourPalette : defaultPalette;

  let headerStyle = { background: palette.primary, color: palette.secondary };
  let dateStyle = { color: palette.detail };
  let descriptionStyle = {
    background: palette.secondary,
    color: palette.detail,
  };
  let detailStyle0 = { background: palette.detail, color: palette.secondary };
  let detailStyle1 = { background: palette.secondary, color: palette.detail };

  const DoneEditButton = () => {
      return(<Link id="editProjectButton" to={"/project/"+props.match.params.id}><div id="editProjectButton">Done</div></Link>)
  }

  const handleHeaderSubmit = (projectTitle) => {
    let ref = firebase.firestore()
    .collection('projects')
    .doc(props.match.params.id);
    ref.update({projectName:projectTitle});
  }

  const handleDescSubmit = (projectDescription) => {
    let ref = firebase.firestore()
    .collection('projects')
    .doc(props.match.params.id);
    ref.update({projectDesc:projectDescription});
  }

  return (
    <div className="projectLayout">
      <DoneEditButton/>
      <ProjectHeader 
        style={headerStyle} 
        dateStyle={dateStyle}
        project={project} 
        submit={handleHeaderSubmit}
        imageUrl={imageUrl} 
        classes={classes}
      />
      <ProjectDescription 
        style={descriptionStyle} 
        project={project} 
        submit={handleDescSubmit}
        classes={classes}
      />      
      <ProjectDetailList
        details={details}
        style0={detailStyle0}
        style1={detailStyle1}
        classes={classes}
        handleDelete={(id)=>(handleDeleteDetail(id))}
      />
      <AddDetailButton add={handleAddDetail}/>
    </div>
  );
}

const ProjectHeader = (props) => {
  let project = props.project;
  let style = props.style;
  let classes = props.classes;
  let dateString = getPostDateString(project.postDate);

  const [projectTitle, setProjectTitle] = useState(props.projectName);
  const [titleSubmitDisable, setTitleSubmitDisable] = useState(true);

  const updateField = (e) => {
    let fieldValue = e.target.value;
    let id = e.target.id;
    switch (id) {
      case "titleEntry":
        setProjectTitle(fieldValue);
        setTitleSubmitDisable(false);
        break;
      default:
        break;
    }
  };


  return(
    <div className="projectDetail" id="header" style={style}>
      <div className="detailImageWrap" id="left">
        <img className="detailImage" alt="" src={props.imageUrl} />
      </div>
      <div className="projectTitle">
        <TextField
          id="titleEntry"
          label="Project Title"
          defaultValue={project.projectName}
          variant="filled"
          multiline
          onChange={updateField}
          InputProps={{
            classes: {
              input: classes.input,
            },
          }}
        />
        <div className="projectAuthor">{project.authorName}</div>
        <div className="projectDate" style={props.dateStyle}>
          {dateString}
        </div>
        <SubmitButton submit={()=>{props.submit(projectTitle)}} submitDisabled={titleSubmitDisable}/>
      </div>
    </div>
  )
}

const ProjectDescription = (props) => {
  
  let project = props.project;
  let style = props.style;
  let classes = props.classes;

  const [projectDescription, setProjectDescription] = useState(project.projectDesc);
  const [descSubmitDisable, setDescSubmitDisable] = useState(true);

  const updateField = (e) => {
    let fieldValue = e.target.value;
    let id = e.target.id;
    switch (id) {
      case "descriptionEntry":
        setProjectDescription(fieldValue);
        setDescSubmitDisable(false);
        break;
      default:
        break;
    }
  };

  return(
    <div className="projectDetail" style={style}>
        <div className="detailTitle" style={style}>
          Description
        </div>
        <div className="detailContent">
          <TextField
            className={classes.bodyText}
            id="descriptionEntry"
            multiline
            defaultValue={project.projectDesc}
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            onChange={updateField}
          />
        </div>
        <SubmitButton submit={()=>{props.submit(projectDescription)}} submitDisabled={descSubmitDisable}/>
      </div>
)
}

const getPostDateString = (postDate) =>{
  if(postDate){
    let date = new Date(postDate * 1000);
    let dateString =
      date.getDay() +
      "." +
      date.getMonth() +
      "." +
      date.getFullYear();
      return dateString;
  }else{
    return "";
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    profile: state.firebase.profile,
    project: state.firestore.data.projects && state.firestore.data.projects[id],
    projectDetails: state.firestore.ordered.projectDetails,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    let pid = props.match.params.id;
    return [
      {
        collection: "projectDetails",
        orderBy: "position",
        where: [["projectId", "==", pid]],
      },
      { collection: "projects", doc: pid },
    ];
  })
)(ProjectEditPage);
