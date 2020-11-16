import React, {Component, useState} from "react";
import "./Home_Page.css";
import { Link } from "react-router-dom";
import Homepage_Image from "./Images/homepage_background_img.svg";
import Responsive_Ftr_Image from "./Images/responsive.png";
import No_Coding_Required_Ftr_Image from "./Images/no_coding_required.png";
import Secure_Ftr_Image from "./Images/secure.png";
import Templates_Provided_Ftr_Image from "./Images/templates_provided.png";
import Get_Started_Unhovered_Icon from "./Icons/Get_Started_Icon_Unhovered.svg";
import Get_Started_Hovered_Icon from "./Icons/Get_Started_Icon_Hovered.svg";
import { useSelector } from "react-redux";

import firebase from "./Firebase"
import EntryBox from "./Generic_Components/Entry_Box";

function HomePage() {
    const [projectId, setProjectId] = useState("");
    const [userId, setUserId] = useState("");

    //const checkClicked = e => { setSelected(e.target.id); console.log(selected); }
    const UidFields = (e) => {
        let fieldValue = e.target.value;
        setUserId(fieldValue);
        
    };

    const PidFields = (e) => {
        let fieldValue = e.target.value;
        setProjectId(fieldValue);

    };


    
    return (
        <div className="home_page">
            <div className="background_graphics">
                <img src={Homepage_Image} id="homepage_image" alt="homepage" />
               
            </div>
            <div className="page_headers">
                <p>Welcome to Everest!</p>
                <h5 id="description">Showcase and reflect on your achievements</h5>
                
               
            </div>


            <div className="page_bottom">
                <p id = "heading">Portfolio Features</p>
                <p id="feature">Share your accomplishments and experience personal growth</p>
            </div>


           

            <button className = "header_btns" id="Features">Features</button>
            <button className = "header_btns" id="About">About</button>
            <button className = "header_btns" id="Search">Search</button>
            <button className = "header_btns" id="Login">Login</button>
         

            <img src={No_Coding_Required_Ftr_Image} id="No_Coding_Required_Ftr" alt="No_Coding_Required_Ftr" />
            <div class ="text"> No Coding Required</div>
            <img src={Templates_Provided_Ftr_Image} id="Templates_Provided_Ftr" alt="Templates_Provided_Ftr" />
            <div class="text1"> Templates Provided</div>
            <img src={Responsive_Ftr_Image} id="Responsive_Ftr" alt="Responsive_Ftr" />
            <div class="text2"> Responsive</div>
            <img src={Secure_Ftr_Image} id="Secure_Ftr" alt="Secure_Ftr" />
            <div class="text3"> Secure</div>


            
                <button className="bottom_btns" id="create_your_portfolio">Create Your Portfolio</button>
                <button className="bottom_btns" id="explore_existing_portfolios">Explore Existing Portfolios</button>
            

           
            <div className="get_started_icon">
                <img src={Get_Started_Unhovered_Icon} id="Get_Started_Unhovered_Icon" alt="Get_Started_Unhovered_Icon" />
                <img src={Get_Started_Hovered_Icon} id="Get_Started_Hovered_Icon" alt="Get_Started_Hovered_Icon" class="overlay" />

            </div>

           
            <div className="user_id">
                <EntryBox id="user_id" textType="text" default="Enter User Id"
                    onChange={UidFields} readonly={false} />
                <button id="submit" onClick={() => {
                    window.location.href = '/projects/' + userId;
                }}> Submit</button>

            </div>

            <div className="project_id">
                <EntryBox id="project_id" textType="text" default="Enter Project Id"
                    onChange={PidFields} readonly={false} />
                <button id="submit" onClick={() => {
                    window.location.href = '/project/' + projectId;
                }}> Submit</button>

            </div>
           
        
        </div>
   
    );
     
};




export default HomePage;