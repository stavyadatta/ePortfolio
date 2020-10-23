export const addProject = (project) => {
    return (dispatch, state, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        firebase.functions().httpsCallable('project-add')(project)
        .then(
            dispatch({
                type:"ADD_PROJECT",
                project
            })).catch((err)=>{
                dispatch({type:'ADD_PROJECT_ERROR', err})
            })
    }
}