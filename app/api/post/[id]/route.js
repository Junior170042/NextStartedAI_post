import Post from "@models/Post"
import { connectToDB } from "@utils/Database"

export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        const post = await Post.findById(params.id).populate('creator')

        if (!post) return new Response("Couldn't find the post", { status: 4040 })

        return new Response(JSON.stringify(post), { status: 200 })
    } catch (err) {
        return new Response(err, { status: 500 })
    }
}


export const PATCH = async (req, { params }) => {
    const { post, tag } = await req.json()

    try {
        await connectToDB()
        const postExists = await Post.findById(params.id)
        if (!postExists) return new Response("Couldn't find the post", { status: 4040 })

        postExists.post = post;
        postExists.tag = tag;
        await postExists.save()
        return new Response(JSON.stringify(postExists), { status: 200 })
    } catch (error) {
        return new Response(error, { status: 500 })
    }

}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB()
        await Post.findOneAndDelete(params.id.id)

        return new Response("Post deleted successfully", { status: 200 })
    } catch (error) {
        return new Response(error, { status: 250 })
    }
}