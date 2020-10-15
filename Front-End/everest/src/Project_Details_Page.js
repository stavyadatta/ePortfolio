import React from "react";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

import "./Project_Details_Page.css";
import defaultProjectImage from "./Images/project_image.jpg"

function ProjectDetailsPage(props){
    let project = props.project;
    let details = props.projectDetails;

    //check if data is loaded
    if(!project || !details){
        return(
            <div>Loading...</div>
        )
    }

    let postDate = new Date(project.postDate.seconds*1000)
    let dateString = 
        postDate.getDay() + 
        "." + postDate.getMonth() + 
        "." + postDate.getFullYear();

    let imageUrl = project.imageUrl ? project.imageUrl : defaultProjectImage

    return (
        <div className="projectLayout">
            <div className="projectHeader">
                <div className="detailImageWrap">
                    <img className="detailImage" alt="" src={imageUrl}/>
                </div>
                <div className="projectTitle">
                    {project.projectName}
                    <div className="projectAuthor">{project.authorName}</div>
                    <div className="projectDate">{dateString}</div>
                </div>
            </div>
            <div className="projectDescription">
                <div className="descriptionTitle">Description</div>
                <div className="descriptionBody">{project.projectDesc}</div>
            </div>
            <ProjectDetailList details={details}/>
        </div>
    );
}

const ProjectDetailList = (props) => {
    return (props.details.map((detail)=>(<ProjectDetail key={detail.id} detail={detail}></ProjectDetail>)))
}

const ProjectDetail = (props)=>{
    let detail=props.detail;
    switch(detail.type){
        case 'right-image':
            return(
                <div className="projectContent">
                    <div className="halfDetailText">{props.detail.text}</div>
                    <div className="detailImageWrap">
                        <img className="detailImage" alt={detail.imageText} src={detail.imageUrl}/>
                    </div>                
                </div>
            )
        case 'left-image':
            return(
                <div className="projectContent">
                    <div className="detailImageWrap">
                        <img className="detailImage" alt={detail.imageText} src={detail.imageUrl}/>
                    </div>
                    <div className="halfDetailText">{detail.text}</div>
                </div>
            )
        default:
            return(
                <div className="projectContent">
                    <div className="detailText">{props.detail.text}</div>
                </div>
            )
    }
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	return {
        profile: state.firebase.profile,
        project: state.firestore.data.projects && state.firestore.data.projects[id],
        projectDetails: state.firestore.ordered.projectDetails
	};
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        let pid = props.match.params.id;
         return [
            { collection: "projectDetails" },
            { collection: "projects", doc: pid }
          ]
        }
    )
)(ProjectDetailsPage);
