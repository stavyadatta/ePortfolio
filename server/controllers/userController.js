const User = require('../models/users/users.model.js')
const UserUpdate = require('../models/users/updateUser.model.js')
const validator = require('validator')

function addUser(addData) {
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
        return validator.isEmail(addData.email) && (/^[a-zA-Z]+$/.test(addData.name));
        
    }
    return false
}

function updatingObject(updateData) {
    const updateObject = new UserUpdate(updateData)
    console.log(updateObject)
}

module.exports = addUser

var x = {
    userId: "1234",
    name: 'Stavya'
}
updatingObject(x)

