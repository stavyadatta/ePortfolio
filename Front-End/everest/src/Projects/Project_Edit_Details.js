import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { MenuItem, Select } from "@material-ui/core";
import firebase from "../Firebase";
import { CancelButton, DeleteButton, SubmitButton } from "./Project_Edit_Buttons";
import { ImageUploadDisplay } from "./Image_Upload_Display";
import defaultProjectImage from "../Images/project_image.jpg";
import { firebaseUrl}  from "../storageFirebaseUpload.js"

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
        handleDelete={props.handleDelete}
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


  const originalTitle = detail.title;
  const originalBody = detail.text;

  const [file, setFile] = useState('')
  const [detailTitle, setDetailTitle] = useState(detail.title);
  const [detailBody, setDetailBody] = useState(detail.text);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [cancelDisabled, setCancelDisabled] = useState(true);

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
    setCancelDisabled(false);
  };

  const handleCancel = () => {
    setDetailTitle(originalTitle);
    setDetailBody(originalBody);
    setSubmitDisabled(true);
    setCancelDisabled(true);
  }

  const handleFile = async (e) => {
    const targetFile = e.target.files[0]
    setFile(targetFile);
    let firebaseFileUrl = await firebaseUrl(targetFile, 'files')
  }
  const UploadFileFunction = (props) => {
    let updateField = props.onChange;
    let classes = props.classes;
    return (
      <div className="detailImageWrap">
          <input type="file" name="mainFile" onChange={e =>handleFile(e)} />
      </div>
    )
  }

  const handleTypeChange = (e) => {
    let ref = firebase.firestore().collection("projectDetails").doc(detail.id);
    ref.update({ type:e.target.value });
  }

  const handleSubmit = () => {
    let ref = firebase.firestore().collection("projectDetails").doc(detail.id);
    let title = detailTitle?detailTitle:"";
    let text = detailBody?detailBody:"";
    let firebaseFileUrl = firebaseUrl(file, 'files')
    ref.update({ title: title, text: text, fileUrl: firebaseFileUrl });
    setSubmitDisabled(true);
    setCancelDisabled(true);
  };

  const handleDelete = () => {
    props.handleDelete(detail.id);
  }

  let detailProps = {
    detail: detail,
    title: detailTitle,
    body: detailBody,
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
    case "default":
      contentLayout = DefaultDetailEdit(detailProps);
    case "file-upload":
      contentLayout = UploadFileFunction(detailProps)

  }

  return (
    <div className="projectDetail" style={props.styles}>
      <div className="detailHead">
        <div id="detailTitle">
          <TextField
            id="detailTitleEntry"
            defaultValue={detailTitle}
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
            onChange={handleTypeChange}
          />
        </div>
        
      </div>
      
      {contentLayout}
      {EditButtons({
        submit:handleSubmit,
        cancel:handleCancel, 
        delete:handleDelete,
        submitDisabled:submitDisabled,
        cancelDisabled:cancelDisabled,
        })}
    </div>
  );
};

const EditButtons = (props) => {
  return (
    <div className="detailEditButtons">
      {SubmitButton(props)}
      {CancelButton(props)}
      {DeleteButton(props)}
    </div>  
  )
}

const RightImgProjectDetailEdit = (props) => {
  let classes = props.classes;
  let updateField = props.onChange;
  return (
    <div className="detailContent">
      <TextField
        className={classes.halfBodyText}
        id="detailBodyEntry"
        multiline
        value={props.body}
        InputProps={{ classes: { input: classes.resize } }}
        onChange={updateField}
      />
      <div className="detailImageWrap" id="right">
        <ImageUploadDisplay imageUrl={props.imgUrl}/>
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
        <ImageUploadDisplay imageUrl={props.imgUrl}/>
      </div>
      <TextField
        className={classes.halfBodyText}
        id="detailBodyEntry"
        multiline
        value={props.body}
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
        value={props.body}
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
    <MenuItem value="file-upload">Upload File</MenuItem>
  </Select>
  )
  
}