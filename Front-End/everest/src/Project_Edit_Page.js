import React, { useState } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import firebase from "./Firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  makeStyles,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import "./Project_Details_Page.css";
import defaultProjectImage from "./Images/project_image.jpg";

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

  const [projectTitle, setProjectTitle] = useState(props.projectName);
  const [projectDescription, setProjectDescription] = useState(props.projectDesc);
  const [titleSubmitDisable, setTitleSubmitDisable] = useState(true);
  const [descSubmitDisable, setDescSubmitDisable] = useState(true);



  const updateField = (e) => {
    let fieldValue = e.target.value;
    let id = e.target.id;
    switch (id) {
      case "titleEntry":
        setProjectTitle(fieldValue);
        setTitleSubmitDisable(false);
        break;
      case "descriptionEntry":
        setProjectDescription(fieldValue);
        setDescSubmitDisable(false);
        break;
      default:
        break;
    }
  };

  const handleHeaderSubmit = () => {
    let ref = firebase.firestore()
    .collection('projects')
    .doc(props.match.params.id);
    ref.update({projectName:projectTitle});
  }

  const handleDescSubmit = () => {
    let ref = firebase.firestore()
    .collection('projects')
    .doc(props.match.params.id);
    ref.update({projectDesc:projectDescription});
  }

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

  let classes = useStyles();

  //check if data is loaded
  if (!project || !details) {
    return <div>Loading...</div>;
  }

  let dateString = getPostDateString(project.postDate);

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

  const ProjectHeader = () => (
    <div className="projectHeader" style={headerStyle}>
        <div className="detailImageWrap">
          <img className="detailImage" alt="" src={imageUrl} />
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
          <div className="projectDate" style={dateStyle}>
            {dateString}
          </div>
          <SubmitButton submit={handleHeaderSubmit} disabled={titleSubmitDisable}/>
        </div>
      </div>
  )

  const ProjectDescription = () => (
    <div className="projectDescription" style={descriptionStyle}>
        <div className="descriptionTitle" style={descriptionStyle}>
          Description
        </div>
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
        <SubmitButton submit={handleDescSubmit} disabled={descSubmitDisable}/>
      </div>
  )

  return (
    <div className="projectLayout">
      <DoneEditButton/>
      <ProjectHeader/>
      <ProjectDescription/>      
      <ProjectDetailList
        details={details}
        style0={detailStyle0}
        style1={detailStyle1}
        classes={classes}
      />
      <AddProjectDetailButton add={handleAddDetail}/>
    </div>
  );
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


/*****************************************************************************
Project Details
*****************************************************************************/
const ProjectDetailList = (props) => {
  let classes = props.classes;
  return props.details.map((detail) => {
    let style = detail.position % 2 === 0 ? props.style0 : props.style1;
    return (
      <ProjectDetailEdit
        key={detail.id}
        detail={detail}
        styles={style}
        classes={classes}
      ></ProjectDetailEdit>
    );
  });
};

const ProjectDetailEdit = (props) => {
  let detail = props.detail;
  let style = props.styles;
  let classes = props.classes;
  let res = "";

  const [detailTitle, setDetailTitle] = useState(detail.title);
  const [detailBody, setDetailBody] = useState(detail.text);

  const updateField = (e) => {
    let fieldValue = e.target.value;
    let id = e.target.id;
    switch (id) {
      case "detailTitleEntry":
        setDetailTitle(fieldValue);
        break;
      case "detailBodyEntry":
        setDetailBody(fieldValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    let ref = firebase.firestore().collection('projectDetails').doc(detail.id);
    ref.update({title:detailTitle, text:detailBody});
  }

  let detailProps = {
    detail:detail,
    styles:style,
    classes:classes,
    onChange:updateField,
    submit:handleSubmit,
  }

  switch (detail.type) {
    case "right-image":
      res = RightImgProjectDetailEdit(detailProps);
      break;
    case "left-image":
      res = LeftImgProjectDetailEdit(detailProps)
      break;
    default:
      res = DefaultDetailEdit(detailProps)
  }
  return res;
};

const RightImgProjectDetailEdit = (props) => {
  let classes = props.classes;
  let updateField = props.onChange;
  return (
    <div className="projectDetail" style={props.styles}>
      <TextField
        id="detailTitleEntry"
        defaultValue={props.detail.title}
        variant="filled"
        onChange={updateField}
      />
      <div className="projectDetailContent">
        <TextField
          className={classes.halfBodyText}
          id="detailBodyEntry"
          multiline
          defaultValue={props.detail.text}
          InputProps={{ classes: { input: classes.resize } }}
          onChange={updateField}
        />
        <div className="detailImageWrap">
          <img
            className="detailImage"
            alt={props.detail.imgText}
            src={props.detail.imgUrl}
          />
        </div>
      </div>
      <SubmitButton submit={props.submit}/>
    </div>
  );
};

const LeftImgProjectDetailEdit = (props) => {
  let updateField = props.onChange;
  let classes = props.classes;
  return (
    <div className="projectDetail" style={props.styles}>
      <TextField
        id="detailTitleEntry"
        defaultValue={props.detail.title}
        variant="filled"
        onChange={updateField}
      />
      <div className="projectDetailContent">
        <div className="detailImageWrap">
          <img
            className="detailImage"
            alt={props.detail.imgText}
            src={props.detail.imgUrl}
          />
        </div>
        <TextField
          className={classes.halfBodyText}
          id="detailBodyEntry"
          multiline
          defaultValue={props.detail.text}
          InputProps={{ classes: { input: classes.resize } }}
          onChange={updateField}
        />
      </div>
      <SubmitButton submit={props.submit}/>
    </div>
  );
};

const DefaultDetailEdit = (props) => {
  let updateField = props.onChange;
  let classes = props.classes;
  return (
    <div className="projectDetail" style={props.styles}>
      <TextField
        id="detailTitleEntry"
        defaultValue={props.detail.title}
        variant="filled"
        onChange={updateField}
      />
      <div className="projectDetailContent">
        <TextField
          className={classes.bodyText}
          id="detailBodyEntry"
          multiline
          defaultValue={props.detail.text}
          InputProps={{ classes: { input: classes.resize } }}
          onChange={updateField}
        />
      </div>
      <SubmitButton submit={props.submit}/>
    </div>
  );
};

const AddProjectDetailButton = (props) => (
  <button className="addProjectDetail" onClick={props.add}>Add Detail</button>
)

const SubmitButton = (props) => (
  <button className="projectEditSubmit" onClick={props.submit} disabled={props.disabled}>Save</button>
)

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
