import React from "react";
import EntryBox from "./Entry_Box";
import "./Entry_With_Header.css";

function HeaderEntry(props) {
    return(
        <div className = {props.divClassName}>
		    <p id = "entry_header">{props.header}</p>
		    <EntryBox id = {props.entryID} textType = "text" 
			default = {props.default} readonly = {props.readOnly} 
			onChange = {props.onChange}/>
	    </div>
    );

}

export default HeaderEntry;