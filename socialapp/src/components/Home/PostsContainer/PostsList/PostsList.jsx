import React, { useContext, useState } from 'react';
import Post from '../Post/Post'
import { PostsContext } from '../../../../contexts/PostsContext'
import './styles.scss'
import { UserContext } from '../../../../contexts/UserContext';

const PostList = () => {
    const _ = require('lodash');
    const {posts, sortingPosts} = useContext(PostsContext)  
    const {currentUser} = useContext(UserContext)
    console.log((currentUser || {}).followers)
    //console.log((currentUser.followers || []))

    const gettingFollowersPost = () =>{
        const followerPostCheck = []
        const followersPost = ((currentUser || {}).followers || []).map(follower => {
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

        return sortedPost
    }

    console.log(gettingFollowersPost())
    return (
        <div className="post-list-container">
            {gettingFollowersPost().map(post => <Post postDesc ={post} />)}
        </div>
    )
}

export default PostList