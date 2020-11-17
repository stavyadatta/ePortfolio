import React from "react";

export const ImageUploadDisplay = (props) => {
  return(
    <div style={{height:"100%", width:"100%", objectFit: "cover"}}>
      <label htmlFor="imageUpload">
        <img className="detailImage" alt="" src={props.imageUrl}/>
      </label>
      <input id="imageUpload" type="file" style={{display:"none"}} onChange={props.handleChange}/>
    </div>
    
  )
}