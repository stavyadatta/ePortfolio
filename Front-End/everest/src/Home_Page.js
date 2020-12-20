import React, {useState} from "react";
import "./Home_Page.css";
import { Link } from "react-router-dom";
import Homepage_Image from "./Images/homepage_background_img.png";
import Responsive_Ftr_Image from "./Icons/responsive.png";
import No_Coding_Required_Ftr_Image from "./Icons/no_coding_required.png";
import Secure_Ftr_Image from "./Icons/secure.png";
import Templates_Provided_Ftr_Image from "./Icons/templates_provided.png";
import Get_Started_Unhovered_Icon from "./Icons/Get_Started_Icon_Unhovered.svg";
import Get_Started_Hovered_Icon from "./Icons/Get_Started_Icon_Hovered.svg";
import firebase from "./Firebase"
import EntryBox from "./Generic_Components/Entry_Box";
import Logo from "./Images/Everest_Logo.svg";
import CardLabel from "./Generic_Components/Card_Label";
import GuyPointing from "./Images/Guy_Pointing.svg";
import Mountain from "./Images/mountain_filler.svg";
import Sun from "./Images/sun_bg_image.png";
import {Link as ScrollLink} from "react-scroll";
import SideBar from "./Generic_Components/Sidebar_Menu";

function HomePage() {
    return (
        <div className="home_page">
            <SideBar pageWrapId={"home_page"} outerContainerId={"home_page"} />
            <FirstSegment />
            <SecondSegment />
            <ThirdSegment />   
        </div>
    );
};

function FirstSegment() {
    return(
        <div className = "homepage_first_segment" id = "segment_one_home">
                <div className="background_graphics">
                    <img src={Homepage_Image} id="homepage_image" alt="homepage" />
                  {/* <img src = {Logo} id = "homepage_logo" alt = "Everest" /> */}
                </div>
                <div className="page_headers">
                <p>Welcome to Everest!</p>
                <h5 id="homepage_description">Showcase and reflect on your achievements</h5>
            </div>
            <FirstSegmentBtns />
            
        </div>
    );
}

function SecondSegment() {
    return(
        <div className = "homepage_second_segment" id ="showcasing_features">
            <div className = "port_features">
                <p id = "features_heading">Portfolio Features</p>
                <p id="features_subheading">Share your accomplishments and experience personal growth</p>
            </div>
            
            <div className = "cards_and_btn">
                <FeatureCards />
                <Link to ="/register">
                    <button className = "bottom_btns" id = "get_started_home">Get Started</button>
                </Link>
            </div>

            <Link to ="/register">
                <img src = {Get_Started_Unhovered_Icon} alt = "get_started" id = "get_started_icon" 
                onMouseOver={e => (e.currentTarget.src = Get_Started_Hovered_Icon)}
                onMouseLeave = {e => (e.currentTarget.src = Get_Started_Unhovered_Icon)}/>
            </Link>

         </div>
    );
}

function ThirdSegment() {
    return(
        <div className = "homepage_third_segment" id = "search_functionality">
            <div className = "third_segment_headings">
                <p id = "home_explore">Explore Existing Portfolios</p>
                <p id = "home_explore_subheading">Search for portfolios made by existing users</p>
            </div>
            <div className = "third_segment_graphics">
                <img src = {Sun} alt = "" id = "homepage_sun"/>
                <img src = {GuyPointing} alt = "" id = "third_segment_image"/>
                <img src = {Mountain} alt = "" id = "third_segment_mountain"/>
            </div>
            <div id = "search_fields_home">
                <UserSearch />
                <ProjectSearch />
            </div>
            <Footer />
        </div>
    );
}

function Footer() {
    return(
        <div className = "footer">
            <p id = "copyright_statement"> © Fully Stacked 2020, The University of Melbourne </p>
            <img src = {Logo} alt = "" id = "footer_logo" />
        </div>
    );
}

function FirstSegmentBtns() {
    return(
        <div>
            <ScrollLink
                activeClass="active"
                className = "header_btns"
                id = "Features"
                to="showcasing_features"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
            >Features</ScrollLink>
            <Link to = "/about">
                <button className = "header_btns" id="About">About</button>
            </Link>
            <ScrollLink
                activeClass="active"
                className = "header_btns"
                id = "Search"
                to="search_functionality"
                spy={true}
                smooth={true}
                offset={0}
                duration={1000}
            >Search</ScrollLink>
            
            <Link to = "/login">
                <button className = "header_btns" id="Login">Login</button>
            </Link>

            <div className = "call_to_action">
            <Link to = "/register">
                <button className="bottom_btns" id="create_your_portfolio">Create Your Portfolio</button>
            </Link>
            <ScrollLink
                activeClass="active"
                className = "bottom_btns"
                id = "explore_existing_portfolios"
                to="search_functionality"
                spy={true}
                smooth={true}
                offset={0}
                duration={1000}
            >Explore Existing Portfolios</ScrollLink>
            </div>
        </div>
    );
}



function FeatureCards() {
    return(
        <div className = "feature_cards">
            <CardLabel cardId = "card_1" label = "Responsive" image={Responsive_Ftr_Image} 
            alt = "responsive_icon" imageId = "responsive" labelId = "responsive_label"/>
            <CardLabel cardId = "card_2" label = "Templates Provided" image={Templates_Provided_Ftr_Image} 
            alt = "templates_icon" imageId = "templates" labelId = "template_label"/>
            <CardLabel cardId = "card_3" label = "No Coding Required" image={No_Coding_Required_Ftr_Image} 
            alt = "no_coding_req_icon" imageId = "no_coding_req" labelId = "no_coding_label"/>
            <CardLabel cardId = "card_4" label = "Secure" image = {Secure_Ftr_Image}
            alt = "secure_icon" imageId = "secure" labelId = "secure_label" />
        </div>
    );
}


function UserSearch() {

    const [userId, setUserId] = useState("");

    const UidFields = (e) => {
        let fieldValue = e.target.value;
        setUserId(fieldValue);
    };

    const handleSubmit = () => {
      firebase.firestore().collection('users').doc(userId).get().then(docRef=>{
        if(docRef.exists){
          window.location.href = '/projects/' + userId;
        } else {
          window.alert("User does not exist.")
        }
      })
    }

    return(
        <div className="home_search_user_id">
            <p className = "search_heading">Search for a User :</p>
            <EntryBox id="home_user_id" textType="text" default="Enter User Search String"
            onChange={UidFields} readonly={false} />
            <button className="home_search_submit" id = "user_search_submit" onClick={handleSubmit}> Submit</button>
        </div>
    );
}

function ProjectSearch() {

    const [projectId, setProjectId] = useState("");

    const PidFields = (e) => {
        let fieldValue = e.target.value;
        setProjectId(fieldValue);

    };

    const handleSubmit = () => {
      firebase.firestore().collection('projects').doc(projectId).get().then(docRef=>{
        if(docRef.exists){
          window.location.href = '/project/' + projectId;
        } else {
          window.alert("Project does not exist.")
        }
      })
    }

    return(
        <div className="home_search_project_id">
            <p className = "search_heading">Search for a Project :</p>
            <EntryBox id="home_search_project_id" textType="text" default="Enter Project ID"
            onChange={PidFields} readonly={false} />
            <button className="home_search_submit" id = "project_search_submit" onClick={handleSubmit}> Submit</button>
        </div>
    );
}

export default HomePage;