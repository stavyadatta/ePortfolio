import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { MenuItem, Select } from "@material-ui/core";
import firebase from "../Firebase";
import { SubmitButton } from "./Edit_Submit_Button";
import defaultProjectImage from "../Images/project_image.jpg";

export const ProjectDetailList = (props) => {
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
  let imgUrl = detail.imgUrl ? detail.imgUrl : defaultProjectImage;

  let contentLayout = "";

  const [detailTitle, setDetailTitle] = useState(detail.title);
  const [detailBody, setDetailBody] = useState(detail.text);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  
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
    setSubmitDisabled(false);
  };

  const handleChange = (e) => {
    let ref = firebase.firestore().collection("projectDetails").doc(detail.id);
    ref.update({ type:e.target.value });
  }

  const handleSubmit = () => {
    let ref = firebase.firestore().collection("projectDetails").doc(detail.id);
    let title = detailTitle?detailTitle:"";
    let text = detailBody?detailBody:"";
    ref.update({ title: title, text: text });
  };

  let detailProps = {
    detail: detail,
    styles: style,
    classes: classes,
    imgUrl: imgUrl,
    onChange: updateField,
    submit: handleSubmit,
  };

  switch (detail.type) {
    case "right-image":
      contentLayout = RightImgProjectDetailEdit(detailProps);
      break;
    case "left-image":
      contentLayout = LeftImgProjectDetailEdit(detailProps);
      break;
    default:
      contentLayout = DefaultDetailEdit(detailProps);
  }

  return (
    <div className="projectDetail" style={props.styles}>
      <div className="detailHead">
        <div id="detailTitle">
          <TextField
            id="detailTitleEntry"
            defaultValue={props.detail.title}
            variant="filled"
            multiline
            fullWidth
            onChange={updateField}
          />
        </div>
        <div id="detailType">
          <SelectDetailType 
            id="detailTypeEntry" 
            type={detail.type} 
            onChange={handleChange}
          />
        </div>
        
      </div>
      
      {contentLayout}
      <SubmitButton submit={handleSubmit} disabled={submitDisabled}/>
    </div>
  );
};

const RightImgProjectDetailEdit = (props) => {
  let classes = props.classes;
  let updateField = props.onChange;
  return (
    <div className="detailContent">
      <TextField
        className={classes.halfBodyText}
        id="detailBodyEntry"
        multiline
        defaultValue={props.detail.text}
        InputProps={{ classes: { input: classes.resize } }}
        onChange={updateField}
      />
      <div className="detailImageWrap" id="right">
        <img
          className="detailImage"
          alt={props.detail.imgText}
          src={props.imgUrl}
        />
      </div>
    </div>
  );
};

const LeftImgProjectDetailEdit = (props) => {
  let updateField = props.onChange;
  let classes = props.classes;
  return (
    <div className="detailContent">
      <div className="detailImageWrap" id="left">
        <img
          className="detailImage"
          alt={props.detail.imgText}
          src={props.imgUrl}
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
  );
};

const DefaultDetailEdit = (props) => {
  let updateField = props.onChange;
  let classes = props.classes;
  return (
    <div className="detailContent">
      <TextField
        className={classes.bodyText}
        id="detailBodyEntry"
        multiline
        defaultValue={props.detail.text}
        InputProps={{ classes: { input: classes.resize } }}
        onChange={updateField}
      />
    </div>
  );
};

const SelectDetailType = (props) => {
  return (
  <Select 
      label="Type"
      onChange={props.onChange} 
      value={props.type}
    >
    <MenuItem value="default">Text Only</MenuItem>
    <MenuItem value="right-image">Right Image</MenuItem>
    <MenuItem value="left-image">Left Image</MenuItem>
  </Select>
  )
  
}