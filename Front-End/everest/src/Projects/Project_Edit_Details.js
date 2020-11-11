import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import firebase from "../Firebase";
import { SubmitButton } from "./Edit_Submit_Button";

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
  let contentLayout = "";

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
    let ref = firebase.firestore().collection("projectDetails").doc(detail.id);
    ref.update({ title: detailTitle, text: detailBody });
  };

  let detailProps = {
    detail: detail,
    styles: style,
    classes: classes,
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
      <TextField
        id="detailTitleEntry"
        defaultValue={props.detail.title}
        variant="filled"
        onChange={updateField}
      />
      {contentLayout}
      <SubmitButton submit={props.submit} />
    </div>
  );
};

const RightImgProjectDetailEdit = (props) => {
  let classes = props.classes;
  let updateField = props.onChange;
  return (
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
  );
};

const LeftImgProjectDetailEdit = (props) => {
  let updateField = props.onChange;
  let classes = props.classes;
  return (
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
  );
};

const DefaultDetailEdit = (props) => {
  let updateField = props.onChange;
  let classes = props.classes;
  return (
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
  );
};
