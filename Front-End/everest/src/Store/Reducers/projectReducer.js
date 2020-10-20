const initialState = {
    projects:[{projectName:'No Projects'}]
}

const projectReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_PROJECT':
            console.log('created' + action.project);
            return state;
        case 'ADD_PROJECT_ERROR':
            console.log('error adding project', action.err);
            return state;
        default:
            return state;
    }
}

export default projectReducer;