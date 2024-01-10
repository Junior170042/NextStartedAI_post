import Post from "@models/Post"
import { connectToDB } from "@utils/Database"

export const GET = async () => {
    try {
        await connectToDB()

        const posts = await Post.find({}).populate('creator')

        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (err) {
        return new Response(err, { status: 500 })
    }
}