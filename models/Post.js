import { model, models, Schema } from 'mongoose'

const PostSchema = new Schema({
    post: {
        type: String,
        required: [true, "The post is required!"],


    },
    creator: {
        type: Schema.Types.ObjectID,
        required: [true, "A userId is required for creating a post!"],
        ref: "User"
    },
    tag: {

        type: String,
        required: [true, "You should provide a tag for your post!"],
    }

}, { timestamps: true })

const Post = models.Post || model("Post", PostSchema)

export default Post;