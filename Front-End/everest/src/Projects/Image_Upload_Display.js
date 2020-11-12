import React, { useState } from "react";

export const ImageUploadDisplay = (props) => {
  const [image, setImage] = useState(props.imageUrl);

  const handleChange = e => {
    if(e.target.files.length){
      setImage({
        image: e.target.files[0],
      })
    };
    console.log(e.target.files[0]);

  }
  return(
    <div style={{height:"100%", width:"100%", objectFit: "cover"}}>
      <label htmlFor="upload">
        <img className="detailImage" alt="" src={props.imageUrl}/>
      </label>
      <input id="upload" type="file" style={{display:"none"}} onChange={handleChange}/>
    </div>
    
  )
}