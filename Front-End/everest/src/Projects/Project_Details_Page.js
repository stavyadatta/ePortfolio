import React, {useState} from "react";
import { Link } from "react-router-dom"
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import firebase from '../Firebase';
import { useHistory } from "react-router-dom";


import "./Project_Details_Page.css";
import defaultProjectImage from "../Images/project_image.jpg";

const defaultPalette = {
  primary:"#082F4E",
  secondary: "#FFFFFF",
  detail:"#a5a5a5"
}

function ProjectDetailsPage(props) {
    let project = props.project;
    let details = props.projectDetails;
    let projectId = props.match.params.id;
    let auth = useSelector(state=>state.firebase.auth);
    let [isLoading, setLoading] = useState('')
    
    let history = useHistory();
    //check if data is loaded
    if (!project || !details) {
        return <div>Loading...</div>;
    }
    if(isLoading) {
        return <div>Loading...</div>
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
    };

    async function deletionFunction(){
        setLoading(true)
        const deleteProject = firebase.functions().httpsCallable('project-delete')
        await deleteProject({projectId: projectId});
        alert("Project is deleted");
        history.push('/projects/' + project.userId); 
        setLoading(false);

    };

    const MaybeDeleteButton = () => {
        if (project.userId === auth.uid) {
            return(<button><div id="deleteProjectButton" onClick={deletionFunction}><span id="textDelete">Delete</span></div></button>)
        }
    }

    return (
        <div className="projectLayout">
          <MaybeEditButton/>
          <MaybeDeleteButton/>
            <div className="projectHeader" style={headerStyle}>
                <div className="detailImageWrap">
                    <img className="detailImage" alt="" src={imageUrl} />
                </div>
                <div className="projectTitle">
                    {project.projectName}
                    <div className="projectAuthor">{project.authorName}</div>
                    <div className="projectDate" style={dateStyle}>{dateString}</div>
                </div>
            </div>
            <div className="projectDescription" style={descriptionStyle}>
                <div className="descriptionTitle" style={descriptionStyle}>Description</div>
                <div className="descriptionBody" style={descriptionStyle}>{project.projectDesc}</div>
            </div>
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

const ProjectDetailList = (props) => {
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
    let res = "";
    switch (detail.type) {
        case "right-image":
            res = <RightImgProjectDetail detail={detail} styles={style} />;
            break;
        case "left-image":
            res = <LeftImgProjectDetail detail={detail} styles={style} />;
            break;
        default:
            res = <DefaultDetail detail={detail} styles={style} />;
    }
    return res;
};

const RightImgProjectDetail = (props) => {
    return (
        <div className="projectDetail" style={props.styles}>
            <div className="detailTitle">{props.detail.title}</div>
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
        </div>
    );
};

const LeftImgProjectDetail = (props) => (
    <div className="projectDetail" style={props.styles}>
        <div className="detailTitle">{props.detail.title}</div>
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
    </div>
);

const DefaultDetail = (props) => (
    <div className="projectDetail" style={props.styles}>
        <div className="detailTitle">{props.detail.title}</div>
        <div className="projectDetailContent">
            <div className="detailText">{props.detail.text}</div>
        </div>
    </div>
);

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
