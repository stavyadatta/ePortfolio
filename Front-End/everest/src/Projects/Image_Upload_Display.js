import React from "react";

export const ImageUploadDisplay = (props) => {
  return(
    <div style={{height:"100%", width:"100%", objectFit: "cover"}}>
      <label htmlFor={`imageUpload ${props.detailId}`}>
        <img className="detailImage" alt="" src={props.imageUrl}/>
      </label>
      <input id={`imageUpload ${props.detailId}`} type="file" accept="image/png, image/jpeg" style={{display:"none"}} onChange={props.handleChange}/>
    </div>
    
  )
}