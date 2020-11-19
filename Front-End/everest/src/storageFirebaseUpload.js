import firebase from "./Firebase"

/*
    The following function will upload the image to firebase storage as well as the firestore
    @params: imageAsFile = imageAsFile source that you would be getitng from your react State 
        (refer to the form_page.js if not clear)
    @params: firebaseFunction = A String type for which firebase function 
        you want to use for the purposefor example projects-add or user-add
    @params: uploadObj = The Obj you want to add, edit to the firestore to firestore database
*/

async function firebaseUpload(imageAsFile, firebaseFunction, uploadObj) {
    var storage = firebase.storage();
    
    if(imageAsFile === '' ) {
      return await projectObjectDetails(undefined, firebaseFunction, uploadObj);
    }
    await storage.ref(`/pictures/${imageAsFile.name}`).put(imageAsFile).catch(err => {
        throw err;
    });
    
    // getting the url and adding it to firebase using projectObjectDetails function
    const firebaseUrl = await storage.ref('pictures').child(imageAsFile.name).getDownloadURL()
        .catch(err => {
            throw err;
    });
    return await projectObjectDetails(firebaseUrl, firebaseFunction, uploadObj)
        .catch(err => {
            throw err;
        });
}

async function projectObjectDetails(firebaseURL,firebaseFunction, uploadObj) { 
    uploadObj.imgURL = firebaseURL; 
    const editCreateFunction = firebase.functions().httpsCallable(firebaseFunction);
    return await editCreateFunction(uploadObj);
}

/* 
    Uploads the user image to the firebase storage and returns 
    firebaseUrl for it
*/
async function firebaseUrl(imageAsFile, fileDirectory='pictures') {
    var storage = firebase.storage();
    await storage.ref(`/${fileDirectory}/${imageAsFile.name}`).put(imageAsFile).catch(err => {
        throw err;
    });
    return await storage.ref(fileDirectory).child(imageAsFile.name).getDownloadURL()
        .catch(err => {
            throw err;
    });


}

export {firebaseUpload, firebaseUrl}