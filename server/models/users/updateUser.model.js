class UserUpdate {

    constructor(user) {
        this.update = {
            userId: user.id,
            updateData: {
                name: user.name,
                email: user.email,
                bio: user.bio
            }
        }
    }
}