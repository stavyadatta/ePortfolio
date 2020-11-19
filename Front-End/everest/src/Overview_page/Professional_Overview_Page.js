import React, {useState} from "react";
import "./Professional_Overview_Page.css";
import CreateCarousel from "./Overview_Page_Carousel";
import {Link} from "react-router-dom";
import Achievement_Image from "../Images/achievement_bg_image.png";
import Sun_Image from "../Images/sun_bg_image.png";
import Home_Btn from "../Icons/home_btn.svg";
import About_Btn from "../Icons/about_btn.svg";
import Signout_Btn from "../Icons/signout_btn.svg";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import firebase from "../Firebase";
import EntryBox from "../Generic_Components/Entry_Box";
import animateComponents from "../Generic_Components/Page_Animations";
import ConfirmDialog from "../Generic_Components/Dialog_Confirmation_Box";

function OverviewPage() {
  let userProfile = useSelector(state=>state.firebase.profile);
  let userAuth = useSelector(state=>state.firebase.auth);
  let [confirmation, setConfirmation] = useState(false);
  let userId = userAuth.uid;
  const [selected, setSelected] = useState("");
  const [counter, setCounter] = useState(0);
  const checkClicked = e => { setSelected(e.target.id); console.log(selected); }

  const handleLogout = function(){ 
    firebase.auth().signOut()
  }

  const animateFields = (e) => {
    if (counter % 2 === 0) { animateComponents(e, "box_filler", 
    "overview_search_fields", 0.55, 0.18); } 
    else { animateComponents(e, "overview_search_fields", "box_filler", 0.55, 0.55); }
    setCounter(counter + 1);
  }

  return(
    <div className = "profile_overview_page">
      <div className = "background_graphics">
        <img src={Sun_Image} id = "overview_sun_image" alt="sun"/>
        <img src={Achievement_Image} id = "achievement_image" alt="mountain_achievement"/>
      </div>
      <div className = "buttons">
        <Link to = "/" >
        <img src={Home_Btn} id = "home_btn" alt="home"/>
        </Link>
        <Link to ="/about">
          <img src={About_Btn} id = "about_btn" alt="about"/>   
        </Link>  
        <img src={Signout_Btn} id = "signout_btn" alt="signout" onClick={() => {setConfirmation(true)}}/>
        <ConfirmDialog
          title="Log Out"
          open={confirmation}
          setOpen={setConfirmation}
          onConfirm={handleLogout}>
            Are you sure you want to Log Out?
          </ConfirmDialog>
      </div>
     
      <CreateCarousel userProfile={userProfile}/>
      <Search />
      <div className = "header_overview_btns">
        
        <div className = "box_filler"></div>
        <button className = "overview_btns" id = "search" onClick = {(e) => animateFields(e)}>Search</button>
        
        <Link to = "/myaccount">
          <button className = "overview_btns" id = "profile" onClick = {checkClicked}>My Account</button>
        </Link>
        <Link to = {`/mypage/${userId}`} >
        <button className = "overview_btns" id = "about_me" onClick = {checkClicked}>My Page</button>
        </Link>
        <Link to = {`/projects/${userId}`}>
            <button className = "overview_btns" id = "artifacts" onClick = {checkClicked}>Portfolio Artifacts</button>
        </Link>
       
      </div>

    </div>
  );
}

function Search() { 
  return(
    <div className = "overview_search_fields">
          {/* <img src = {Cross} alt = "" id = "cancel_search" onClick = {(e) => animateComponents(e, "overview_search_fields", 
              "box_filler", 0.55, 0.18)}/> */}
          <SearchUsers />
          <SearchProjects />
    </div>
  );
}

function SearchUsers() {

   const [userId, setUserId] = useState("");

    const UidFields = (e) => {
        let fieldValue = e.target.value;
        setUserId(fieldValue);
    };

    const handleSubmit = () => {
      if (userId === "") {alert("Please fill in the field"); }
      else{
      firebase.firestore().collection('users').doc(userId).get().then(docRef=>{
        if(docRef.exists && userId !== ""){
          window.location.href = '/projects/' + userId;
        } else {
          window.alert("User does not exist.")
        }
      })
      }
    }

  return(
    <div className="overview_search_user_id">
          <EntryBox id="overview_user_id" textType="text" default="Enter User Search String"
          onChange={UidFields} readonly={false} />
          <button className="overview_search_submit" id = "overview_user_search_submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

function SearchProjects() {

  const [projectId, setProjectId] = useState("");

  const PidFields = (e) => {
      let fieldValue = e.target.value;
      setProjectId(fieldValue);

  };

  const handleSubmit = () => {
    if (projectId === "") {alert("Please fill in the field"); }
    else{
    firebase.firestore().collection('projects').doc(projectId).get().then(docRef=>{
      if(docRef.exists){
        window.location.href = '/project/' + projectId;
      } else {
        window.alert("Project does not exist.")
      }
    })
    }
  }

  return(
    <div className="overview_search_projects_id">
          <EntryBox id="overview_project_id" textType="text" default="Enter Project ID"
          onChange={PidFields} readonly={false} />
          <button className="overview_search_submit" id = "overview_projects_search_submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
      auth:state.firebase.auth
  };
};

export default connect(mapStateToProps)(OverviewPage);
