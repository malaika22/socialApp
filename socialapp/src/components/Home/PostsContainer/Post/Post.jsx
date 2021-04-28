import React, { useContext, useState, createElement, useEffect, useRef } from 'react'
import './styles.scss'
import {Avatar} from 'antd'
import {LikeFilled, LikeOutlined} from '@ant-design/icons'
import {UserOutlined} from '@ant-design/icons'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../../../contexts/UserContext'
import { PostsContext } from '../../../../contexts/PostsContext'

const Post = ({postDesc}) => {
    const {currentUser} = useContext(UserContext)
    const {likePost, dislikePost, updatePost,alreadyLike, posts} = useContext(PostsContext)
    const {userId} = useParams()
 
    console.log(posts)

    const changeLike = (postDesc) =>{
        console.log(postDesc.liked)
      const updatedPosts =  posts.map(post => 

        /* 
        Like Functionality firebase

        When user likes post 
        add userId in posts likedBy field
        increment post like by one
        check if the likedBy id === user logged in if true => likedFilledIcon if false likedIcon

        if the like Action is dislike and the user is in the LikedBy field 
        remove user from likedBy field
        decrement likes 

        */

       /* {
            if(post.id===postDesc.id) {
                if(post.liked ===undefined || post.liked===false) {
                    console.log('in like')
                    console.log(post)
                    //likePost(post.id)
                   return {
                        ...post , 
                        liked : true,
                        likes: post.likes + 1
                    }

                } else {
                    //console.log(post.liked)
                    console.log('in dislike')
                    console.log(post)
                    //dislikePost(post.id)
                    return {
                        ...post,
                        liked : false,
                        likes : post.likes -1
                    }
                }
                
            } else {
                return post
            }
        }    */

        // Changing likes using Global State =>> needs to add likes through database

        post.id === postDesc.id ? 
         post.liked === undefined || post.liked === false ?
         //likePost(post.id)
         {
            ...post ,
            likes : post.likes + 1,
            liked : true
        } : {
            ...post , 
            likes : post.likes -1,
            liked: false
        } : post 
        )

        updatePost(updatedPosts)
    
    }
   
 
    return (
        <div>   
            <div>
            <Avatar icon={<UserOutlined/>}/>
            {userId ?
                <div>{postDesc.postBy}</div>
             :
             <Link to={`/user/${postDesc.authorId}`} >{postDesc.postBy}</Link>
            }
            </div>
            
            <div>{postDesc.post}</div> 
            <span onClick={()=>changeLike(postDesc)}> {createElement(postDesc.liked  ? LikeFilled : LikeOutlined)} </span>  <span> {postDesc.likes}   </span>
            <span>{moment(postDesc.createdAt.toDate()).fromNow()}</span>
        </div>
    )
}

export default Post