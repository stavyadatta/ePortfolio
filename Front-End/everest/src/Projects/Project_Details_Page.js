import React, {useState} from "react";
import { Link } from "react-router-dom"
import { firestoreConnect, populate } from "react-redux-firebase";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import firebase from '../Firebase';
import { useHistory } from "react-router-dom";
import ConfirmDialog from '../Generic_Components/Dialog_Confirmation_Box.js';


import "./Project_Details_Page.css";
import defaultProjectImage from "../Images/project_image.jpg";
import editButton from "../Icons/edit-round-line.svg";
import deleteButton from "../Icons/close-round-line.svg";
import { ProjectDetailList } from "./Project_Details";
import NavbarPad from "../Navbar/NavbarPad"
import palettes from "./Project_Palettes";

function ProjectDetailsPage(props) {
    let project = props.project;
    let details = props.projectDetails;
    let projectId = props.match.params.id;
    let auth = useSelector(state=>state.firebase.auth);
    let [isLoading, setLoading] = useState('');
    let [confirmOpen, setConfirmOpen] = useState('')
    
    let history = useHistory();
    //check if data is loaded
    if (!project || !details) {
        return <div>Loading...</div>;
    }
    if(isLoading) {
        return <div>Loading...</div>
    }

    let profile = props.project.userId;


    let dateString = getPostDateString(project.postDate);

    let imageUrl = project.imgURL ? project.imgURL : defaultProjectImage;
    let palette = profile.template? palettes[profile.template]:palettes["Professional"];
    
    let headerStyle = {background:palette.primary, color:palette.secondary}
    let dateStyle = {color:palette.detail}
    let descriptionStyle = {background:palette.secondary, color:palette.detail}
    let detailStyle0 = {background:palette.detail, color:palette.secondary}
    let detailStyle1 = {background:palette.secondary, color:palette.detail}

    const MaybeEditButton = () => {
        if(project.userId.id === auth.uid){
          return(<Link id="editProjectButton" to={"/project/"+props.match.params.id+"/edit"}><img id="editProjectButton" src={editButton} alt=""/></Link>)
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
        if (project.userId.id === auth.uid) {
            return(
              <div>
                <img id="deleteProjectButton" src={deleteButton} alt="" onClick={()=>{setConfirmOpen(true)}}/>
                <ConfirmDialog
                  title="Delete project" 
                  open={confirmOpen}
                  setOpen={setConfirmOpen}
                  onConfirm={deletionFunction}>
                      Are you sure you want to delete this project
                  </ConfirmDialog> 
              </div>
            )
        } else {
            return (<div/>);
        }
    }

    const ProjectHeader = () => (
      <div className="projectDetail" id="header" style={headerStyle}>
          <div className="detailImageWrap" id="left">
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
        <div className="detailContent" >
            <div className="detailText">{project.projectDesc}</div>
        </div>
    </div>
    )

    return (
        <div className="projectLayout">
          <MaybeDeleteButton/>
          <MaybeEditButton/>
          <NavbarPad color={palette.primary}/>
          <ProjectHeader/>
          <ProjectDescription/>
            
          <ProjectDetailList details={details} style0={detailStyle0} style1={detailStyle1}/>
        </div>
    );
}


const getPostDateString = (postDate) =>{
  if(postDate){
    let timestamp = new firebase.firestore.Timestamp(postDate.seconds, postDate.nanoseconds);
    console.log({timestamp})
    let date =  timestamp.toDate();
    console.log({date})
    let dateString =
      date.getDate() +
      "." +
      (date.getMonth() + 1) +
      "." +
      date.getFullYear();
      return dateString;
  }else{
    return "";
  }
}

const populates = [{child:'userId', root:'users'}];

const mapStateToProps = ({firebase, firestore}, ownProps) => {
  const id = ownProps.match.params.id;
  return {
      project: populate(firestore, `projects/${id}`, populates),
      projectDetails: firestore.ordered.projectDetails,
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
          { collection: "projects", populates, doc: pid },
      ];
  })
)(ProjectDetailsPage);

