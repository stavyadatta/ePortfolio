import React from "react";
import { Link } from "react-router-dom"
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";

import "./Project_Details_Page.css";
import defaultProjectImage from "../Images/project_image.jpg";
import {ProjectDetailList} from "./Project_Details";

const defaultPalette = {
  primary:"#082F4E",
  secondary: "#FFFFFF",
  detail:"#a5a5a5"
}

function ProjectDetailsPage(props) {
    let project = props.project;
    let details = props.projectDetails;
    let auth = useSelector(state=>state.firebase.auth)
    

    //check if data is loaded
    if (!project || !details) {
        return <div>Loading...</div>;
    }


    let dateString = getPostDateString(project.postDate);

    let imageUrl = project.imgURL ? project.imgURL : defaultProjectImage;
    let palette = project.colourPalette?project.colourPalette:defaultPalette;
    
    let headerStyle = {background:palette.primary, color:palette.secondary}
    let dateStyle = {color:palette.detail}
    let descriptionStyle = {background:palette.secondary, color:palette.detail}
    let detailStyle0 = {background:palette.detail, color:palette.secondary}
    let detailStyle1 = {background:palette.secondary, color:palette.detail}

    const MaybeEditButton = () => {
        if(project.userId === auth.uid){
          return(<Link id="editProjectButton" to={"/project/"+props.match.params.id+"/edit"}><div id="editProjectButton">Edit</div></Link>)
        }else{
          return(<div/>);
        }
    }

    const ProjectHeader = () => (
      <div className="projectDetail" id="header" style={headerStyle}>
          <div className="detailImageWrap">
              <img className="detailImage" alt="" src={imageUrl} />
          </div>
          <div className="projectTitle">
              {project.projectName}
              <div className="projectAuthor">{project.authorName}</div>
              <div className="projectDate" style={dateStyle}>{dateString}</div>
          </div>
      </div>
    )

    const ProjectDescription = () => (
      <div className="projectDetail" style={descriptionStyle}>
        <div className="detailTitle">Description</div>
        <div className="projectDetailContent" >
            <div className="detailText">{project.projectDesc}</div>
        </div>
    </div>
    )

    return (
        <div className="projectLayout">
          <MaybeEditButton/>
          <ProjectHeader/>
          <ProjectDescription/>
            
          <ProjectDetailList details={details} style0={detailStyle0} style1={detailStyle1}/>
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

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        profile: state.firebase.profile,
        project:
            state.firestore.data.projects && state.firestore.data.projects[id],
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
)(ProjectDetailsPage);
