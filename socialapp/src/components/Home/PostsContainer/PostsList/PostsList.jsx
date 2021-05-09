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
    console.log(currentUser)
console.log(users)
console.log(posts)
console.log('followers post', followersPost)
    useEffect(()=>{
        gettingFollowersPost()
    }, [currentUser, posts])
    
    const gettingFollowersPost = () =>{
        console.log("in follow start")
        const followerPostCheck = [];
         ( (currentUser || {}).followers || []).map(follower => {
             console.log('follow check')
             console.log(follower)
            for(let i in posts) {
                console.log('post check')
                if(follower === posts[i].authorId){
                    console.log('author check')
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