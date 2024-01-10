import Post from "@models/Post"
import { connectToDB } from "@utils/Database"

export const POST = async (req) => {
    const { post, userId, tag } = await req.json()


    connectToDB()

    try {
        const newPost = new Post({
            post: post,
            creator: userId,
            tag: tag
        })

        await newPost.save()

        return new Response(JSON.stringify(newPost), { status: 200 })

    } catch (err) {
        return new Response("Error: " + err.message, { status: 500 })
    }
}