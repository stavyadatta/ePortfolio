import React from "react";

export const ImageUploadDisplay = (props) => {
  return(
    <div style={{maxHeight:"100%", maxWidth:"100%", display:"flex", justifyContent:"center", alignContent:"center"}}>
      <label htmlFor={`imageUpload ${props.detailId}`} style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
        <img className="detailImage" alt="" src={props.imageUrl}/>
      </label>
      <input id={`imageUpload ${props.detailId}`} type="file" accept="image/png, image/jpeg" style={{display:"none"}} onChange={props.handleChange}/>
    </div>
    
  )
}