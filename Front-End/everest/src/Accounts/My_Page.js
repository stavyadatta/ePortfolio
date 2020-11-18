import React, {useState} from "react";
import NavIcons from "../Generic_Components/Nav_Icons";
import Sun_Image from "../Images/sun_bg_image.png";
import My_Page_Mountain from "../Images/my_page_background.png";
import Mountain from "../Images/my_page_mountain.png";
import BackBtn from "../Generic_Components/Back_Icon";
import EnableEditBtns from "../Generic_Components/Edit_Btns";
import animateComponents from "../Generic_Components/Page_Animations";
import "./My_Page.css";
import firebase from "../Firebase";
import { useSelector } from "react-redux";
// import Profile_Pic from "../Images/Square_Default_Profile_Pic.svg";
// import SmallBtn from "../Generic_Components/Small_Btn";
// import MyPageFiller from "../Images/My_Page_Filler.png";

function MyPage() {

    const [editable, setEditable] = useState(false);
    const [bio, setBio] = useState("");
	let userInfo = useSelector(state=>(state.firebase.profile));
    
    const enableEdits = e => {
		document.getElementById("user_bio_entry").readOnly = false;
        animateComponents(e, "enable_edit", "editing_btns", 0.5, 0.3);
        setEditable(true);
    }
    
    const disableEdits = e => {
        document.getElementById("active_user_bio_entry").readOnly = true;
        document.getElementById("active_user_bio_entry").value = userInfo.bio;
        setEditable(false);
        animateComponents(e, "editing_btns", "enable_edit", 0.5, 0.3);
        setBio("");
    }

    const saveEdits = e => {
        let user = firebase.auth().currentUser;
        let newBio = (bio === "" &&  document.getElementById("active_user_bio_entry").value !== "") ? userInfo.bio : bio;
        document.getElementById("active_user_bio_entry").value = newBio;
        firebase.functions().httpsCallable("user-update")({
			userId: user.uid,
			bio: newBio
		}).then(()=>{
			//Send email verification
        }).catch(e=>console.log(e));
        document.getElementById("active_user_bio_entry").readOnly = true;
        setEditable(false);
        animateComponents(e, "editing_btns", "enable_edit", 0.5, 0.3);
        setBio("");
        alert("Confirmation: Your Changes have been Saved");
    }
    
    const updateFields = e => {
        setBio(e.target.value); 
        if (document.getElementById("active_user_bio_entry").value === "") {
            document.getElementById("active_user_bio_entry").placeholder = "Write your personal bio here!";
        }
    }

	return(
		<div className = "my_page">
			<h1 id = "my_page_header">My Page</h1>
            <MyPageBackground />
			<NavIcons />
			<EnableEditBtns EnableEdits = {enableEdits} DisableEdits = {disableEdits} SaveEdits = {saveEdits}/>
            
            <textarea id = {editable ? "active_user_bio_entry" : "user_bio_entry"} 
            placeholder = {userInfo.bio === "" ? "Write your personal bio here!" : userInfo.bio} 
            defaultValue = {userInfo.bio === "" ? "" : userInfo.bio} readOnly = {true} onChange = {e => updateFields(e)}/>
            
            {/* <div className = "profile_pic_user">
                <img src = {Profile_Pic} alt = "" id = "user_profile_pic"/>
                <SmallBtn id = "my_page_edit_pic" text = "Edit Profile Picture"/>
            </div> */}

            {/* <div id = "page_filler">
                <img src = {MyPageFiller} alt = "" id = "my_page_filler" />
            </div> */}
            
        </div>
    );
    
}

function MyPageBackground() {
    return(
        <div id = "my_page_background">
			<img src = {Sun_Image} id = "sun_background_my_page"alt = ""/>
			<img src = {Mountain} id = "mountain" alt = "" />
			<img src = {My_Page_Mountain} id = "my_page_person" alt= "" />
			<BackBtn />
		</div>
    );
}

export default MyPage;