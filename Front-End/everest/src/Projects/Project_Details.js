import React from "react";

import "./Project_Details_Page.css";
import defaultProjectImage from "../Images/project_image.jpg";

export const ProjectDetailList = (props) => {
  return props.details.map((detail) => {
    let style = detail.position % 2 === 0 ? props.style0 : props.style1;
    return (
      <ProjectDetail
        key={detail.id}
        detail={detail}
        styles={style}
      ></ProjectDetail>
    );
  });
};

const ProjectDetail = (props) => {
  let detail = props.detail;
  let style = props.styles;
  let contentLayout = "";
  let imgUrl = detail.imgUrl ? detail.imgUrl : defaultProjectImage;

  switch (detail.type) {
    case "right-image":
      contentLayout = <RightImgProjectDetail detail={detail} imgUrl={imgUrl}/>;
      break;
    case "left-image":
      contentLayout = <LeftImgProjectDetail detail={detail} imgUrl={imgUrl}/>;
      break;
    default:
      contentLayout = <DefaultDetail detail={detail}/>;
  }
  return (
    <div className="projectDetail" style={style}>
      <div className="detailHead">
        <div className="detailTitle">{detail.title}</div>
      </div>
      {contentLayout}
    </div>
  );
};

const RightImgProjectDetail = (props) => {
  return (
    <div className="detailContent">
      <div className="halfDetailText">{props.detail.text}</div>
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

const LeftImgProjectDetail = (props) => (
  <div className="detailContent">
    <div className="detailImageWrap" id="left">
      <img
        className="detailImage"
        alt={props.detail.imgText}
        src={props.imgUrl}
      />
    </div>
    <div className="halfDetailText">{props.detail.text}</div>
  </div>
);

const DefaultDetail = (props) => (
  <div className="detailContent">
    <div className="detailText">{props.detail.text}</div>
  </div>
);
