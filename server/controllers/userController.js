const User = require('../models/users/users.model.js')
const validator = require('validator')

async function addUser(addData) {
    if (checkingUserObject(addData)) {
        const user = new User(addData)
        user.add().then((res) => {
            return "User Added"
        })
    } else {
        throw new Error("User Object is not valid")
    }
}

function checkingUserObject(addData) { 
    if (addData.hasOwnProperty('name','bio', 'email', 'userId')) {
        return validator.isEmail(addData.email)
        
    }
    return false
}

module.exports = addUser

