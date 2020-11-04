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
    var uploadTask = '';
    var storage = firebase.storage();
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(imageAsFile.name)[1];
    
    if(imageAsFile === '' ) {
        await projectObjectDetails(undefined, firebaseFunction, uploadObj);
        alert("PROJECT HAS BEEN ADDED")                                                                                                                 
        return;
    }
    console.log('hello1')
    uploadTask = storage.ref(`/pictures/${imageAsFile.name}`).put(imageAsFile);
    // if(ext === 'jpg' || ext === 'png') {
    //     uploadTask = storage.ref(`/pictures/${imageAsFile.name}`).put(imageAsFile);
    //     console.log('/pictures/${imageAsFile.name}')
    // } else {
    //     uploadTask = storage.ref(`/files/${imageAsFile.name}`).put(imageAsFile);
    // }
    
    return await uploadTask.on('state_changed', async snapshot => {
        console.log(snapshot)
    }, err => {
        console.log(err)
    }, async () => {
        console.log('snapshot');
        const firebaseUrl = await storage.ref('pictures').child(imageAsFile.name).getDownloadURL();
        await projectObjectDetails(firebaseUrl, firebaseFunction, uploadObj)
    })
}

async function projectObjectDetails(firebaseURL,firebaseFunction, uploadObj) { 
    console.log("ENtering the project Details fnction")
    uploadObj.imgURL = firebaseURL; 
    const crudFunction = firebase.functions().httpsCallable(firebaseFunction)
    await crudFunction(uploadObj)
}

export default firebaseUpload