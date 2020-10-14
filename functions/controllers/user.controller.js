const User = require('../models/users.model.js')
const UserUpdate = require('../models/updateUser.model.js')
const validator = require('validator')


async function addUser(addData) {
    if (await checkingUserObject(addData)) {
        const user = new User(addData)
        await user.add().catch((error) => {
            throw new Error("error in user.controller \n" + error)
        })
        return `User ${user.dataObject.name} has been added`
    } else {
        return "Either the email is wrong or the userId already exist"
    }
}

async function checkingUserObject(addData) { 
    if (addData.hasOwnProperty('name','bio', 'email', 'userId')) {
        const userExistence = await User.searchUser(addData.userId)
        const userExist = userExistence.exists
        return (validator.isEmail(addData.email) && !userExist)
        
    }
    return false
}

async function updateUser(updateData) {
    const updateObject = new UserUpdate(updateData)
    await User.update(updateObject).catch((err) => {
        console.log(err)
        return err
    })
    return `User ${updateObject.update.userId} updated`
    
}
async function deleteUser(deleteData) {
    var userData = ''
    if (deleteData.hasOwnProperty("userId")) {
        userData = await User.delete(deleteData).catch(err => {
            console.log(err)
            return err.message
        })
        if (userData !== false) {
            return `deleted User ${deleteData.userId}`
        } else {
            return 'UserId not found'
        }
    } else {
        return wrongObjectType()
    }
}
async function getUser(getData) {
    if (getData.hasOwnProperty("userId")){
        const data = await User.readUser(getData.userId)
        return data
    } else {
        return wrongObjectType()
    }
}

function wrongObjectType() {
    throw new Error("Object has no property userId")
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUser: getUser
}




