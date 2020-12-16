import React from "react";
import BackgroundImage from "./Images/homepage_background_img.png";
import "./About_Page.css";
import BackIcon from "./Generic_Components/Back_Icon";
import Stavya from "./Images/Creators_Pics/Stavya_Pic.JPG";
import Niphan from "./Images/Creators_Pics/Niphan_Pic.JPG";
import Farhan from "./Images/Creators_Pics/Farhan_Pic.JPG";
import Ujjwal from "./Images/Creators_Pics/Ujjwal_Pic.JPG";
import Joshua from "./Images/Creators_Pics/Joshua_Pic.JPG";
import Logo from "./Icons/Everest_logo.png";

function AboutPage() {
    return(
        <div className = "about_page">
            <img src = {Logo} alt = "" id = "about_logo" />
            <div>
                <img src = {BackgroundImage} alt = "" id = "about_bg_image"/>
                <div className = "about_cover_up"></div>
                <BackIcon />
            </div>

            <h2 className = "about_header_text" id = "about_heading">About Us</h2>
            <div id = "about_intro">
                <p className = "about_text">
                    Everest is an ePortfolio system created by team Fully Stacked as part of the capstone subject IT Project (COMP30022). 
                    The team members responsible for the website are Joshua Robinson, Ujjwal Agarwal, Farhan Sajeed, Stavya Datta, and 
                    Niphan Sethi.  
                </p>
            </div>
            <div id = "about_the_app">
                <p className = "about_text">
                    The purpose of Everest is to allow users to create a personalized online portfolio. There are two templated provided: 
                    professional and casual. These can be switched to fit your design preferences and overall purpose. Users can recognize 
                    and showcase their achievements, as well as reflect on projects. The user’s profile, portfolio, and/or individual projects 
                    can easily be shared to friends and potential employers via a simple web link or a quick search feature. This can be accomplished 
                    by sharing a unique search string. The end goal is for users to achieve personal growth.
                </p>
            </div>
           
            <div className = "creator_pics">
                <h2 className = "about_header_text" id = "meet_heading">Meet the Team</h2>
                <CreatorPics />
            </div>
        </div>
    );
}

function CreatorPics() {
    return(
        <div>
            <div className = "about_pictures">
                <div id = "farhan_label_div">
                    <img src = {Farhan} alt = "Farhan" id = "farhan_pic"/>
                    <p className = "about_text" id = "farhan_label">Farhan Sajeed</p>
                </div>
               <div id = "stavya_label_div">
                 <img src = {Stavya} alt = "Stavya" id = "stavya_pic"/>
                 <p className = "about_text" id = "stavya_label">Stavya Datta</p>
               </div>
               <div id = "ujjwal_label_div">
                <img src = {Ujjwal} alt = "Ujjwal" id = "ujjwal_pic"/>
                <p className = "about_text" id = "ujjwal_label">Ujjwal Agarwal</p>
               </div>
                <div id = "joshua_label_div">
                    <img src = {Joshua} alt = "Joshua" id = "joshua_pic"/>
                    <p className = "about_text" id = "joshua_label">Joshua Robinson</p>
                </div>
                <div id = "niphan_label_div">
                    <img src = {Niphan} alt = "Niphan" id = "niphan_pic"/>
                    <p className = "about_text" id = "niphan_label">Niphan Sethi</p>
                </div>
                
            </div>
        </div>
    );
}

export default AboutPage;