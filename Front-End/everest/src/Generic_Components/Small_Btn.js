import React, {Component} from "react";
import "./Small_Btn.css";

class SmallBtn extends Component {
    render() {
        return(
            <button className = "small_btn" id = {this.props.id} 
		    onClick = {this.props.callBack}>{this.props.text}</button>
        );
    }
}

export default SmallBtn;