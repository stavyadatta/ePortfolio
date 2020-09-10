const User = require('../models/users/users.model.js')

const object = {
    name: "Ishani",
    email: "xxxyyyyyzzzz",
    userId: "ishaniSingh",
    bio: "I am crazy"
}

const user = new User(object)
user.add()