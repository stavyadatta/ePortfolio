import React from "react";
import "./Project_Edit_Buttons.css"

export const SubmitButton = (props) => (
  <button className="editProjectButton" onClick={props.submit} disabled={props.submitDisabled}>Save</button>
)

export const DeleteButton = (props) => (
  <button className="editProjectButton" id="delete" onClick={props.delete}>Delete</button>
)

export const CancelButton = (props) => (
  <button className="editProjectButton" onClick={props.cancel} disabled={props.cancelDisabled} >Cancel</button>
)

export const AddDetailButton = (props) => (
  <button className="editProjectButton" onClick={props.add} >Add Detail</button>
)   