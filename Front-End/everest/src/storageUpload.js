import firebase from "./Firebase"
/*
    The following function will upload the image to firebase storage as well as the firestore
    @params: imageAsFile = imageAsFile source that you would be getitng from your react State 
        (refer to the form_page.js if not clear)
    @params: firebaseFunction = A String type for which firebase function 
        you want to use for the purposefor example projects-add or user-add
    @params: uploadObj = The Obj you want to upload to firestore database
*/
async function firebaseUpload(imageAsFile, firebaseFunction, uploadObj) {
    console.log("hello")
    var storage = firebase.storage();
    
    if(imageAsFile === '' ) {
        await projectObjectDetails(undefined, firebaseFunction, uploadObj);
        return;
    }
    console.log('hello1')
    await storage.ref(`/pictures/${imageAsFile.name}`).put(imageAsFile);
    
    const firebaseUrl = await storage.ref('pictures').child(imageAsFile.name).getDownloadURL();
    await projectObjectDetails(firebaseUrl, firebaseFunction, uploadObj)
}

async function projectObjectDetails(firebaseURL,firebaseFunction, uploadObj) { 
    console.log("ENtering the project Details fnction")
    uploadObj.imgURL = firebaseURL; 
    const crudFunction = firebase.functions().httpsCallable(firebaseFunction)
    await crudFunction(uploadObj)
}

export default firebaseUpload