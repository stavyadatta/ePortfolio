const authReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return true;
        case "LOGOUT":
            return false;
        default:
            return false;
    }
}

export default authReducer;