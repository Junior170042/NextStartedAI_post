'use client'

import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const PostCard = ({ post, handleItemClick, handleEdit, handleDelete }) => {

    const [copied, setCopied] = useState('')
    const { data: session } = useSession()
    const pathName = usePathname()
    const router = useRouter()

    const handleProfile = (postId, postUsername) => {
        if (postId === session?.user.id) {
            router.push('/profile')
        } else {
            router.push(`/profile-other?id=${postId}/${postUsername}`)
        }
    }

    const handleCopy = () => {
        setCopied(post.post)
        navigator.clipboard.writeText(post.post);
        setTimeout(() => {
            setCopied('')
        }, 4000)
    }

    return (
        <div className='prompt_card'>
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center cursor-pointer gap-3">
                    <Image className='rounded-full object-contain' src={post.creator.image} alt="image_creator" width={30} height={30} onClick={() => handleProfile(post.creator._id, post.creator.username)} />

                    <div className="flex flex-col">
                        <h2 className="capitalize font-satoshi font-semibold text-gray-900">{post.creator.username}</h2>
                        <p className="font-inter text-sm text-gray-600">{post.creator.email}</p>
                    </div>
                </div>

                <div className="copy_btn" onClick={handleCopy}>
                    <Image src={copied === post.post ? "assets/icons/tick.svg" : "assets/icons/copy.svg"}
                        height={12} width={12} alt="copy_icon" />
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">{post.post}</p>
            <p className="font-inter text-sm cursor-pointer blue_gradient" onClick={() => handleItemClick && handleItemClick(post.tag)}># {post.tag}</p>

            {session?.user.id === post.creator._id && pathName === '/profile' &&
                <div className="mt-5 flex-between gap-4 border-t pt-3 border-gray-100">
                    <p className="font-inter cursor-pointer text-sm green_gradient"
                        onClick={handleEdit}
                    >Edit</p>

                    <p className="font-inter cursor-pointer text-sm orange_gradient"
                        onClick={handleDelete}
                    >Delete</p>
                </div>
            }
        </div>
    );
}

export default PostCard;
