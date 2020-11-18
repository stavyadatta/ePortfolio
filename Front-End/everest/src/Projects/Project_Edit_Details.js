import React, { useState } from "react";
import { MenuItem, Select } from "@material-ui/core";
import firebase from "../Firebase";
import { CancelButton, DeleteButton, SubmitButton } from "./Project_Edit_Buttons";
import { ImageUploadDisplay } from "./Image_Upload_Display";
import defaultProjectImage from "../Images/project_image.jpg";
import { firebaseUrl } from "../storageFirebaseUpload";
import defaultFileImage from "../Icons/templates_provided.png";



export const ProjectDetailList = (props) => {
  return props.details.map((detail) => {
    let style = detail.position % 2 === 0 ? props.style0 : props.style1;
    return (
      <ProjectDetailEdit
        key={detail.id}
        detail={detail}
        styles={style}
        handleDelete={props.handleDelete}
      ></ProjectDetailEdit>
    );
  });
};

const ProjectDetailEdit = (props) => {
  let detail = props.detail;
  let style = props.styles;
  const maxTitleLength = 320;

  let contentLayout = "";

  const originalTitle = detail.title;
  const originalBody = detail.text;
  const originalImg = detail.imgUrl ? detail.imgUrl : "";

  const [detailTitle, setDetailTitle] = useState(detail.title);
  const [detailBody, setDetailBody] = useState(detail.text);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [cancelDisabled, setCancelDisabled] = useState(true);
  const [detailImage, setDetailImage] = 
    useState(detail.imgUrl ? detail.imgUrl : defaultProjectImage);
  const [isNewImage, setIsNewImage] = useState(false);
  const [filename, setFileName] = useState(detail.filename ? detail.filename : false);
  const [fileUrl, setFileUrl] = useState(detail.fileUrl ? detail.fileUrl : false);
  const [file, setFile] = useState('');
  const [isFile, setIsFile] = useState(false);

  const updateField = (e) => {
    let fieldValue = e.target.value;
    let id = e.target.id;
    switch (id) {
      case "detailTitleEntry":
        setDetailTitle(fieldValue);
        setSubmitDisabled(false);;
        setCancelDisabled(false);
        break;
      case "detailBodyEntry":
        setDetailBody(fieldValue);
        setSubmitDisabled(false);;
        setCancelDisabled(false);
        break;
      case `imageUpload ${detail.id}`:
        if(e.target.files[0].size < 1000000){
          firebaseUrl(e.target.files[0]).then(url=>setDetailImage(url));
          setIsNewImage(true);
          setSubmitDisabled(false);
          setCancelDisabled(false);
        }else{
          window.alert("Images must be less than 1 MB large")
          return;
        }
        break;
      case "fileUpload":
        handleFile(e);
        setSubmitDisabled(false);
        setCancelDisabled(false);
        break;
      default:
        break;
    }
    
  };

  const handleCancel = () => {
    setDetailTitle(originalTitle);
    setDetailBody(originalBody);
    setDetailImage(originalImg);
    setIsNewImage(false);
    setSubmitDisabled(true);
    setCancelDisabled(true);
  }

  const handleTypeChange = (e) => {
    let ref = firebase.firestore().collection("projectDetails").doc(detail.id);
    ref.update({ type:e.target.value });
  }

  const handleSubmit = async () => {
    let ref = firebase.firestore().collection("projectDetails").doc(detail.id);
    let title = detailTitle?detailTitle:"";
    let text = detailBody?detailBody:"";

    if(title.length > maxTitleLength){
      window.alert(`Title is too long, must be less than ${maxTitleLength} characters`)
      return;
    } else {
      if(isNewImage){
        ref.update({imgUrl: detailImage})
      } else if(isFile){
        let firebaseFileUrl = await firebaseUrl(file, 'files');
        setFileUrl(firebaseFileUrl);  
        ref.update({filename: filename, fileUrl: firebaseFileUrl});
        setIsFile(false);
      }

      ref.update({ title: title, text: text });
      
      setSubmitDisabled(true);
      setCancelDisabled(true);
    }
  };

  const handleDelete = () => {
    props.handleDelete(detail.id);
  }

  const handleFile = async (e) => {
    const targetFile = e.target.files[0];
    // let firebaseFileUrl = await firebaseUrl(targetFile, 'files');
    if(targetFile.size > 10000000){//10Mb
      window.alert("File must be less than 10MB")
      return;
    } else {
      setFile(targetFile);
      setIsFile(true);
      //setFileUrl(firebaseFileUrl);
      setFileName(targetFile.name);
    }
  }

  let detailProps = {
    detail: detail,
    title: detailTitle,
    body: detailBody,
    styles: style,
    imgUrl: detailImage,
    filename: filename,
    fileUrl: fileUrl,
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
    case "file-upload":
      contentLayout = UploadProjectDetailEdit(detailProps);
      break;
    default:
      contentLayout = DefaultDetailEdit(detailProps);
  }

  return (
    <div className="projectDetail" style={props.styles}>
      <div className="detailHead">
        <div className="detailTitle">
          <input
            type="text"
            id="detailTitleEntry"
            defaultValue={detailTitle}
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
  let updateField = props.onChange;
  return (
    <div className="detailContent">
      <textarea
        className="halfDetailText"
        id="detailBodyEntry"
        value={props.body}
        onChange={updateField}
      />
      <div className="detailImageWrap" id="right">
        <ImageUploadDisplay detailId={props.detail.id} imageUrl={props.imgUrl} handleChange={updateField}/>
      </div>
    </div>
  );
};

const LeftImgProjectDetailEdit = (props) => {
  let updateField = props.onChange;
  return (
    <div className="detailContent">
      <div className="detailImageWrap" id="left">
        <ImageUploadDisplay detailId={props.detail.id} imageUrl={props.imgUrl} handleChange={updateField}/>
      </div>
      <textarea
        className="halfDetailText"
        id="detailBodyEntry"
        value={props.body}
        onChange={updateField}
      />
    </div>
  );
};

const UploadProjectDetailEdit = (props) => {
  let updateField = props.onChange;
  return (
    // <div className="detailContent">
    //   <a href={props.fileUrl} download>{props.filename}</a>
    //   <input type='file' id="fileUpload" name="mainFile" onChange={updateField} />
    //   <textarea
    //     className="detailText"
    //     id="detailBodyEntry"
    //     value={props.body}
    //     onChange={updateField}
    //   />
    // </div>
    <div className="detailContent">
      <textarea
        className="detailText"
        id="detailBodyEntry"
        value={props.body}
        onChange={updateField}
      />
      <div className="detailFileContent">
        <img
          className="detailFileImage"
          alt={props.detail.imgText}
          src={defaultFileImage}
          href={props.fileUrl}
          />
          <div className="detailFileName">
            <a href={props.fileUrl} download>  {props.filename}</a> 
          </div>
          <div className="detailFileChoose">
            <input type='file' className="detailFileInput" id="fileUpload" name="mainFile" onChange={updateField} />
          </div>
      </div>
      
    </div>
  )
}

const DefaultDetailEdit = (props) => {
  let updateField = props.onChange;
  return (
    <div className="detailContent">
      <textarea
        className="detailText"
        id="detailBodyEntry"
        value={props.body}
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