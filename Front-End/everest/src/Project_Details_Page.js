import React from "react";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

import "./Project_Details_Page.css";

function ProjectDetailsPage(props) {
    let project = props.project;

    return (
        <div>
            <div className="container section project-details">
                <div className="card z-depth-5">
                    <div className="card-content">
                        <span className="card-title">{project.projectName}</span>
                        <p>{project.projectBody}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>
                            
                        </div>
                        <div>Posted at:</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	return {
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
