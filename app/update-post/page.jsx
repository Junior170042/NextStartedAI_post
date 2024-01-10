
'use client'


import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const UpdatePost = () => {
    const searchParams = useSearchParams()
    const postId = searchParams.get("id")

    const router = useRouter();


    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setPost] = useState({
        post: "",
        tag: ""
    });


    useEffect(() => {

        const getSinglePost = async () => {

            try {
                const post = await fetch(`/api/post/${postId}`)
                const result = await post.json()

                setPost(result)


            } catch (err) {
                console.log(err);
            }
        }

        if (postId) getSinglePost();

    }, [postId])

    const handleUpdatePost = async (event) => {
        event.preventDefault();
        setIsSubmit(true)

        if (!postId) return alert("Post Id is missing!")

        try {
            const response = await fetch(`/api/post/${postId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    post: data.post,
                    tag: data.tag
                })
            })

            if (response.ok) {
                router.push('/profile')
            }

        } catch (err) {
            console.log(err.message)
        } finally {
            setIsSubmit(false)
        }

    }

    return (

        <Form
            type="Edit"
            isSubmit={isSubmit}
            data={data}
            setPost={setPost}
            handleSubmit={handleUpdatePost}
        />

    );
}

export default UpdatePost;
