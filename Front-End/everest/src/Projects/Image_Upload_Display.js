import React, { useState } from "react";

export const ImageUploadDisplay = (props) => {

  const handleChange = (e) => {
    console.log('handling');
    props.handleChange(e);
  }

  console.log(props.handleChange);
  return(
    <div style={{height:"100%", width:"100%", objectFit: "cover"}}>
      <label htmlFor="upload">
        <img className="detailImage" alt="" src={props.imgUrl}/>
      </label>
      <input id="upload" type="file" style={{display:"none"}} onChange={handleChange}/>
    </div>
    
  )
}