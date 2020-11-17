import React from "react";
import "./Card_Label.css";

function CardLabel(props) {
    return(
        <div className = "card" id = {props.cardId}>
            <img className = "card_image" src = {props.image} alt = {props.alt} id = {props.imageId}/>
            <p className = "label" id = {props.labelId}>{props.label}</p>
        </div>
    );
}

export default CardLabel;