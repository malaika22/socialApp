import React, { useContext, useState } from 'react';
import Post from '../Post/Post'
import { PostsContext } from '../../../contexts/PostsContext'
import './styles.scss'

const PostList = () => {
    const {posts} = useContext(PostsContext)   
    return (
        <div>
            {posts.map(post => <Post postDesc ={post} />)}
        </div>
    )
}

export default PostList