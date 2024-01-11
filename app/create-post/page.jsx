'use client'
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePost = () => {

    const router = useRouter();
    const { data: session } = useSession();

    if (!session?.user) return router.push("/")


    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setPost] = useState({
        post: "",
        tag: ""
    });

    const handleCreatePost = async (event) => {
        event.preventDefault();
        setIsSubmit(true)


        try {
            const response = await fetch("/api/post/new", {
                method: "POST",
                body: JSON.stringify({
                    post: data.post,
                    userId: session?.user.id,
                    tag: data.tag
                })
            })

            if (response.ok) {
                router.push('/')
            }

        } catch (err) {
            console.log(err.message)
        } finally {
            setIsSubmit(false)
        }

    }

    return (

        <Form
            type="Create"
            isSubmit={isSubmit}
            data={data}
            setPost={setPost}
            handleSubmit={handleCreatePost}
        />

    );
}

export default CreatePost;
