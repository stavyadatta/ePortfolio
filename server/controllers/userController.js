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

async function updateUser(updateData) {
    const updateObject = new UserUpdate(updateData)
    User.update(updateObject).then((res) => {
        return "Updated"
    }).catch((err) => {
        console.log(err)
    })
    
}
async function deleteUser(deleteData) {
    if (deleteData.hasOwnProperty("userId")) {
        User.delete(deleteData).then((res) => {
            return res
        })
    }
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}


