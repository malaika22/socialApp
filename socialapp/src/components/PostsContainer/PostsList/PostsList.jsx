import React, { useContext } from 'react';
import Post from '../Post/Post'
import { PostsContext } from '../../../contexts/PostsContext'
import './styles.scss'

const PostList = () => {
    const {posts} = useContext(PostsContext)
    console.log(posts)
    return (
        <div>
            {posts.map(post => <Post postDesc ={post}/>)}
        </div>
    )
}

export default PostList