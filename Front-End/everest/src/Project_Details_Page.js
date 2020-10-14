import React from "react";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

import "./Project_Details_Page.css";

function ProjectDetailsPage(props){
    let project = props.project;

    return (
        <projectDetails>
            <div className="projectHeader">
                <div className="projectTitle">{project.projectName}</div>
            </div>
            <div className="projectDescription">
                <div className="descriptionTitle">Description</div>
                <div className="descriptionBody">{project.projectDesc}</div>
            </div>
            <div className="projectContent">
                <div className="contentBody">{project.projectBody}</div>
            </div>
        </projectDetails>
    );
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	return {
        profile: state.firebase.profile,
		project: state.firestore.data.projects && state.firestore.data.projects[id],
	};
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
         return [
               { collection: "projects", doc: props.match.params.id },
          ]
        }
    )
)(ProjectDetailsPage);
