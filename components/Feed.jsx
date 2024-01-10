'use client'

import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { handleSearchWord } from "@utils/HandleSearch";

const PostCardList = ({ data, search, handleItemClick }) => {
    const [posts, setNewPost] = useState(data)
    const handleSearch = (array, keyWord) => {
        const newPostFilter = handleSearchWord(array, keyWord)
        setNewPost(newPostFilter)

    }

    useEffect(() => {
        handleSearch(data, search)
    }, [data, search]);

    return (
        <div className="mt-16 prompt_layout">
            {posts?.map(post => <PostCard
                key={post._id}
                post={post}
                handleItemClick={handleItemClick}
            />)}
        </div>
    )
}

const Feed = () => {

    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch("/api/post");
            const data = await response.json();

            setPosts(data)
        }

        getPost()
    }, [])

    const handleItemClick = (tag) => {
        const newFiter = posts.filter(post => post.tag === tag);
        if (newFiter) return setPosts(newFiter)

    }




    return (
        <section className="feed">

            <form className="relative flex-center w-full">
                <input type='text' placeholder='Search by tag, username or words..'
                    className='search_input peer'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    required
                />
            </form>

            <PostCardList data={posts} search={searchText} handleItemClick={handleItemClick} />
        </section>
    );
}

export default Feed;
