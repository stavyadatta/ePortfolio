
class UserUpdate {

    constructor(user) {            
        if (user.hasOwnProperty('userId')){ 
            // To remove the userId from the given object and then copying object
            // in the field
            const userId = user.userId
            delete user.userId            
            this.update = {
                userId: userId,
                updateData: user
        }} else {
            throw new Error("Invalid update object, needs to have userId")
        }
    }
}

module.exports = UserUpdate