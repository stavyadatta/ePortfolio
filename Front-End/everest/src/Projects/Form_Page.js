import React, { useState } from "react";
import "./Form_Page.css";
import firebase from "../Firebase";
import {useSelector} from "react-redux";
import { withRouter } from "react-router-dom";


function FormPage(props) {
  const [pName, setPName] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pBody, setPBody] = useState("");
  const [pTags, setPTags] = useState("");      // COULD BE useState([])
  const [isLoading, setLoading] = useState("")
  //   const [pImg, setPImg] = useState("");   
  const userAuth = useSelector(state => state.firebase.auth);
  const userId = userAuth.uid;
 // const allInputs = {imgUrl: ''};
  const [imageAsFile, setImageAsFile] = useState('');
  //const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  if (isLoading === true) {
    return <div>Loading...</div>
  }
  else if (isLoading === 'submitted') {
    window.location = '/projects' + userId;
  }
  const updateField = (e) => {

    let fieldValue = e.target.value;

    if (e.target.id === "name_entry") {
        setPName(fieldValue);
    } 
    if (e.target.id === "desc_entry") {
          setPDesc(fieldValue);
    }
    if (e.target.id === "body_entry") {
          setPBody(fieldValue);
    }
    if (e.target.id === "tags_entry") {
          setPTags(fieldValue);
    }

//     if (e.target.id === "main_image_upload") {
//         setPImg(Link to the image);
//   }

};

// function checkForBlank() {
//     if (document.getElementById("name_entry").value === "") {
//         alert("Please Enter Project Name");
//         // return false;
    
//         if (document.getElementById("desc_entry").value === "") {
//         alert("Please Enter Project Description");
          
//         }

//         return false;

//     }
//     else {return true;}
// }

// formats the objects to be sent with certain URL
async function projectObjectDetails(firebaseURL) {
  const projectObjects = {
    userId: userId,
    projectName: pName,
    projectDesc: pDesc,
    imgURL: firebaseURL,
    projectTags: pTags.split(","),
    projectBody: pBody
  };
  const add = firebase.functions().httpsCallable('project-add')
  await add(projectObjects)

}


  async function handleSubmit (event) {
    setLoading(true);
    event.preventDefault();
    // checkForBlank();
    await handleFireBaseUpload(event);
  }


  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(imageFile => (image));
  }



  const handleFireBaseUpload = async e => {
    e.preventDefault();

    let storage = firebase.storage();
    // async magic goes here...
    if(imageAsFile === '' ) {
      await projectObjectDetails(undefined);
<<<<<<< Updated upstream
    //   alert("Project Has Been Added")
    //   props.history.push("/projects" + userId);
=======
      alert("Project Has Been Added")
>>>>>>> Stashed changes
      return;
    }

    const re = /(?:\.([^.]+))?$/;
    var uploadTask = '';
    const ext = re.exec(imageAsFile.name)[1];
    if(ext === 'jpg' || ext === 'png') {
      uploadTask = storage.ref(`/pictures/${imageAsFile.name}`).put(imageAsFile);
    } else {
      uploadTask = storage.ref(`/files/${imageAsFile.name}`).put(imageAsFile);
    }

    
    return await uploadTask.on('state_changed', async snapshot => {
      console.log(snapshot)
    }, err => {
      console.log(err)
    }, async () => {
      console.log('snapshot');
      const firebaseUrl = await storage.ref('pictures').child(imageAsFile.name).getDownloadURL();
      await projectObjectDetails(firebaseUrl)
      setLoading('submitted');
      alert("Project Has Been Added");
<<<<<<< Updated upstream
      props.history.push("/projects" + userId);
      
=======
>>>>>>> Stashed changes
    })
  }

  return (

    <div>

        {/************************************************************************/}

        <div className = "container">

            <h2 id="form_header">Project Details</h2>

            <form onSubmit={e => handleSubmit(e)} >
                <label htmlFor="name_entry">Project Name</label>
<<<<<<< Updated upstream
                <input type="text" id="name_entry" name="projectName" placeholder="Enter Project Name" onChange={updateField} value={pName}  required/>

                <label htmlFor="desc_entry">Project Description</label>
                <input type="text" id="desc_entry" name="projectDescription" placeholder="Enter Short Description of Project" onChange={updateField} value={pDesc}  required/>
=======
                <input type="text" id="name_entry" name="projectName" placeholder="Enter Project Name" onChange={updateField} value={pName} required/>

                <label htmlFor="desc_entry">Project Description</label>
                <input type="text" id="desc_entry" name="projectDescription" placeholder="Enter Short Description of Project" onChange={updateField} value={pDesc} required/>
>>>>>>> Stashed changes

                <label htmlFor="body_entry">Project Body</label>
                <textarea id="body_entry" name="projectBody" placeholder="Enter Detailed Body of Project" style={{height:"150px"}} onChange={updateField} value={pBody}></textarea>

                <label htmlFor="tags_entry">Project Tags</label>
                <input type="text" id="tags_entry" name="projectTags" placeholder="Enter Project Tags separated by comma" onChange={updateField} value={pTags}/>

                <label htmlFor="main_image_upload">Main Project Image Upload</label>
                <input type="file" id="main_image_upload" name="mainImage" accept="image/*" onChange={handleImageAsFile} required/>  {/* MIGHT NEED TO USE VALUE PROPERTY LATER INSIDE THIS INPUT TAG*/}

                <input type="submit" id="submitButton" value="Save Project"/>
            </form>
        
        </div>

        {/**************************************************************************/}

    </div>
    
      
  );
}

export default withRouter(FormPage);

//export default FormPage;
// const mapStateToProps = (state) => {
//   return {
//       auth:state.firebase.auth
//   };
// };
