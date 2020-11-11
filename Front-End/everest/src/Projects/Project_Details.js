import React from "react";

import "./Project_Details_Page.css";

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
  switch (detail.type) {
    case "right-image":
      contentLayout = <RightImgProjectDetail detail={detail}/>;
      break;
    case "left-image":
      contentLayout = <LeftImgProjectDetail detail={detail}/>;
      break;
    default:
      contentLayout = <DefaultDetail detail={detail}/>;
  }
  return (
    <div className="projectDetail" style={style}>
      <div className="detailTitle">{detail.title}</div>
      {contentLayout}
    </div>
  );
};

const RightImgProjectDetail = (props) => {
  return (
    <div className="projectDetailContent">
      <div className="halfDetailText">{props.detail.text}</div>
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

const LeftImgProjectDetail = (props) => (
  <div className="projectDetailContent">
    <div className="detailImageWrap">
      <img
        className="detailImage"
        alt={props.detail.imgText}
        src={props.detail.imgUrl}
      />
    </div>
    <div className="halfDetailText">{props.detail.text}</div>
  </div>
);

const DefaultDetail = (props) => (
  <div className="projectDetailContent">
    <div className="detailText">{props.detail.text}</div>
  </div>
);
