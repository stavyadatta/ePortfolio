import React from "react";
import "./Edit_Btns.css";

function EnableEditBtns(props) {
	return(
		<div>
			<div className = "enable_edit">
				<button className = "account_btns" id = "edit_account_info" onClick = {(e) => props.EnableEdits(e)}>Edit</button>
			</div>
			<div className = "editing_btns">
				<button className = "account_btns" id = "save_info" onClick = {(e) => props.SaveEdits(e)}>Save</button>
				<button className = "account_btns" id = "discard_changes" onClick = {(e) => props.DisableEdits(e)}>Cancel</button>
			</div>
		</div>
	);
}

export default EnableEditBtns;