const User = require('../models/users/users.model.js')
const UserUpdate = require('../models/users/updateUser.model.js')
const validator = require('validator')

function addUser(addData) {
    if (checkingUserObject(addData)) {
        const user = new User(addData)
        user.add().then((res) => {
            return "User Added"
        }).catch((error) => {
            console.log(error)
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
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}


