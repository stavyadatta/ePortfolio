import React, {useState} from "react";
import "./Home_Page.css";
import { Link } from "react-router-dom";
import Homepage_Image from "./Images/homepage_background_img.png";
import Responsive_Ftr_Image from "./Images/responsive.png";
import No_Coding_Required_Ftr_Image from "./Images/no_coding_required.png";
import Secure_Ftr_Image from "./Images/secure.png";
import Templates_Provided_Ftr_Image from "./Images/templates_provided.png";
import Get_Started_Unhovered_Icon from "./Icons/Get_Started_Icon_Unhovered.svg";
import Get_Started_Hovered_Icon from "./Icons/Get_Started_Icon_Hovered.svg";
import { useSelector } from "react-redux";

import firebase from "./Firebase"

function HomePage() {
    const [selected, setSelected] = useState("");
    const checkClicked = e => { setSelected(e.target.id); console.log(selected); }

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

            <div className="header_overview_btns">
                <button className="overview_btns" id="Home" onClick={checkClicked}>Home</button>
                <button className="overview_btns" id="About" onClick={checkClicked}>About</button>
                <button className="overview_btns" id="Explore" onClick={checkClicked}>Explore</button>
                <button className="overview_btns" id="Login" onClick={checkClicked}>Login</button>

            </div>

            <img src={No_Coding_Required_Ftr_Image} id="No_Coding_Required_Ftr" alt="No_Coding_Required_Ftr" />
            <div class ="text"> No Coding Required</div>
            <img src={Templates_Provided_Ftr_Image} id="Templates_Provided_Ftr" alt="Templates_Provided_Ftr" />
            <div class="text1"> Templates Provided</div>
            <img src={Responsive_Ftr_Image} id="Responsive_Ftr" alt="Responsive_Ftr" />
            <div class="text2"> Responsive</div>
            <img src={Secure_Ftr_Image} id="Secure_Ftr" alt="Secure_Ftr" />
            <div class="text3"> Secure</div>


            <div className="bottom_portfolio_btns">
                <button className="bottom_btns" id="Create Your Portfolio">Create Your Portfolio</button>
                <button className="bottom_btns" id="Explore Existing Portfolios">Explore Existing Portfolios</button>
            </div>

           
            <div class="container">
                <img src={Get_Started_Unhovered_Icon} id="Get_Started_Unhovered_Icon" alt="Get_Started_Unhovered_Icon" />
                    <img src={Get_Started_Hovered_Icon} id="Get_Started_Hovered_Icon" alt="Get_Started_Hovered_Icon"  class ="overlay"/>
              
            </div>

           

        
        </div>

     
    );
    

   
};


export default HomePage;