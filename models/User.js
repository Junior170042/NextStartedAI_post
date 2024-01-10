import { model, models, Schema } from 'mongoose'

const isValideEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email)
};

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: [true, 'The email address is required!'],
        unique: [true, 'The email address is already in use!'],
        validate: [isValideEmail, "Please enter a valid email address"]
    },
    username: {
        type: String,
        required: [true, 'The username is required!'],
    },
    image: { type: String }

}, { timestamps: true })

const User = models.User || model("User", UserSchema)

export default User;