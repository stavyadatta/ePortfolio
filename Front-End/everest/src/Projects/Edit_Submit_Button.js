import React from "react";

export const SubmitButton = (props) => (
  <button className="projectEditSubmit" onClick={props.submit} disabled={props.disabled}>Save</button>
)