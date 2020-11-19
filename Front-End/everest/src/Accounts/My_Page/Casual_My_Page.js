import React, {useState} from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import "./Casual_My_Page.css";
import SignOut from "../../Icons/signout_btn.svg";
import Navbar from "../../Navbar/Navbar";
import firebase from "../../Firebase";
import Casual_My_Page_Image from "../../Images/casual_account_bg.png";
import BackBtn from "../../Generic_Components/Back_Icon";
import animateComponents from "../../Generic_Components/Page_Animations";
import ConfirmDialog from "../../Generic_Components/Dialog_Confirmation_Box";




function CasualMyPage(props) {

    const [editable, setEditable] = useState(false);
    const [bio, setBio] = useState("");
    const userInfo = props.userInfo;
    let [confirmation, setConfirmation] = useState(false);
    let userUID = props.uid;
    let auth = useSelector(state=>state.firebase.auth);
        auth = props.auth.uid;

    if(!userInfo){
        return (<div>Loading...</div>);
    }
    
    const UserHeading = (props) => {
        if (userUID  === auth) {
            return (
                <div>
                    <h1 id = "casual_my_page_header">My Page</h1>
                </div>
            )
        } else {
            return ( 
                <div>
                    <h1 id = "casual_my_page_header">{userInfo.firstName} {userInfo.lastName}'s Bio</h1>
                </div>)
        }
    }
    
    const handleLogout = function(){ 
        firebase.auth().signOut()
    }
    
    const enableEdits = e => {
		document.getElementById("casual_user_bio_entry").readOnly = false;
        animateComponents(e, "casual_my_page_enable_edit", "casual_my_page_editing_btns", 0.5, 0.3);
        setEditable(true);
    }
    
    const disableEdits = e => {
        document.getElementById("casual_active_user_bio_entry").readOnly = true;
        document.getElementById("casual_active_user_bio_entry").value = userInfo.bio;
        setEditable(false);
        animateComponents(e, "casual_my_page_editing_btns", "casual_my_page_enable_edit", 0.5, 0.3);
        setBio("");
    }

    const saveEdits = e => {
        let user = firebase.auth().currentUser;
        let newBio = (bio === "" &&  document.getElementById("casual_active_user_bio_entry").value !== "") ? userInfo.bio : bio;
        document.getElementById("casual_active_user_bio_entry").value = newBio;
        firebase.functions().httpsCallable("user-update")({
			userId: user.uid,
			bio: newBio
		}).then(()=>{
			//Send email verification
        }).catch(e=>console.log(e));
        document.getElementById("casual_active_user_bio_entry").readOnly = true;
        setEditable(false);
        animateComponents(e, "casual_my_page_editing_btns", "casual_my_page_enable_edit", 0.5, 0.3);
        setBio("");
        alert("Confirmation: Your Changes have been Saved");
    }
    
    const updateFields = e => {
        setBio(e.target.value); 
        if (document.getElementById("casual_active_user_bio_entry").value === "") {
            document.getElementById("casual_active_user_bio_entry").placeholder = "Write your personal bio here!";
        }
    }

    return(
        <div className = "casual_my_page">
            <div className = "partition_my_page">
                <img src = {Casual_My_Page_Image} id = "casual_my_page_image" alt = "" />
                <div className = "my_page_info_partition">
                    {/* <h1 id = "casual_my_page_header">My Page</h1> */}
                    
                    <UserHeading/>
                    <textarea id = {editable ? "casual_active_user_bio_entry" : "casual_user_bio_entry"} 
                    placeholder = {userInfo.bio === "" ? "Write your personal bio here!" : userInfo.bio} 
                    defaultValue = {userInfo.bio === "" ? "" : userInfo.bio} readOnly = {true} onChange = {e => updateFields(e)}/>
                    {!props.auth.isEmpty && props.auth.uid === props.match.params.userId?<EnableEditBtns EnableEdits = {enableEdits} DisableEdits = {disableEdits} SaveEdits = {saveEdits}/>:<div/>}
                    <BackBtn />
                </div>
                
            </div>
            <Navbar />
            
            <img src = {SignOut} id = "casual_my_page_signout" alt = "" onClick = {() => {setConfirmation(true)}}/>
            <ConfirmDialog
                title="Log Out"
                open={confirmation}
                setOpen={setConfirmation}
                onConfirm={handleLogout}>
                    Are you sure you want to Log Out?
            </ConfirmDialog>
        </div>
    );
}

function EnableEditBtns(props) {
	return(
		<div>
			<div className = "casual_my_page_enable_edit">
				<button className = "casual_my_page_btns" id = "casual_my_page_edit_info" onClick = {(e) => props.EnableEdits(e)}>Edit</button>
			</div>
			<div className = "casual_my_page_editing_btns">
				<button className = "casual_my_page_btns" id = "casual_my_page_save_info" onClick = {(e) => props.SaveEdits(e)}>Save</button>
				<button className = "casual_my_page_btns" id = "casual_my_page_discard_changes" onClick = {(e) => props.DisableEdits(e)}>Cancel</button>
			</div>
		</div>
	);
}



const mapStateToProps = (state, props) => {
  let uid = props.match.params.userId;
  return {
    auth: state.firebase.auth,
    userInfo: state.firestore.data.users && state.firestore.data.users[uid],
    uid: uid
  };
};



export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
      let uid = props.match.params.userId;
      return [
          { collection: "users", doc: uid },
      ];
  })
)(CasualMyPage);