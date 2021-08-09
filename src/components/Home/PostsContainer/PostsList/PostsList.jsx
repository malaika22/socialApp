import React, { useContext, useEffect, useState } from 'react';
import Post from '../Post/Post'
import { PostsContext } from '../../../../contexts/PostsContext'
import './styles.scss'
import { UserContext } from '../../../../contexts/UserContext';

const PostList = () => {
    const _ = require('lodash');
    const {posts, sortingPosts} = useContext(PostsContext)  
    const {users,currentUser, followers} = useContext(UserContext)
    const [followersPost, setFollowersPost] = useState(posts)

    useEffect(()=>{
        gettingFollowersPost()
    }, [currentUser, posts])
    
    const gettingFollowersPost = () =>{
        console.log("in follow start")
        const followerPostCheck = [];
         ( (currentUser || {}).followers || []).map(follower => {
            for(let i in posts) {
                if(follower === posts[i].authorId){
                    followerPostCheck.push(posts[i])
                }
                //return null
            }
        })

        for(let i in posts) {
            if((currentUser || {}).uid === posts[i].authorId){
                followerPostCheck.push(posts[i])
            }
        }

         const sortedPost =  _.sortBy(followerPostCheck, (o)=>{
            return o.createdAt.toDate()
        }).reverse()

         setFollowersPost(sortedPost)
    } 

    return (
        <div className="post-list-container">
            {(followersPost || []).map(post => <Post postDesc ={post} />) }
        </div>
    )
}

export default PostList