'use client'
import { useState, useEffect } from 'react';
import Profile from "@components/Profile"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MyProfile = ({ username, userId }) => {

    const [userPost, setUserPost] = useState([])
    const { data: session } = useSession()
    const router = useRouter()

    if (!session?.user) return router.push("/")

    useEffect(() => {
        const getPost = async () => {
            let response;
            if (session?.user.id === userId || !userId) {
                response = await fetch(`api/users/${session?.user.id}/posts`);
            } else {
                response = await fetch(`api/users/${userId}/posts`);
            }
            const data = await response.json();

            setUserPost(data)
        }

        if (session?.user.id || userId) getPost()
    }, [])

    const handleEdit = (post) => {
        router.push(`/update-post?id=${post._id}`)
    }


    const handleDelete = async (post) => {
        const hasConfirm = confirm('Are you sure you want to delete this post?')

        if (hasConfirm) {
            try {

                await fetch(`api/post/${post._id}`, { method: 'DELETE' });

                const postFilter = userPost.filter(p => p._id !== post._id);

                setUserPost(postFilter)

            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Profile
            name={username ? username : "My"}
            description={`Welcome to ${username ? username : "your"} profile!`}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            data={userPost}
        />
    );
}

export default MyProfile;
