import React, { useContext, useState, createElement, useEffect, useRef } from 'react'
import './styles.scss'
import {Avatar, Input} from 'antd'
import {FireOutlined, FireFilled, SendOutlined} from '@ant-design/icons'
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
    const {TextArea} = Input
    const likeDisplay = () =>{
        if(postDesc.liked) {
            return (
                <>
                <FireFilled style={{color: "#F97C50" , fontSize : "16px", cursor: "pointer"}}/>
               
            </>
            )
        } else {
            return (
            <>
                <FireOutlined style={{color: "#F97C50" , fontSize: "16px", cursor: "pointer"}} />
                
            </>
            )
        }
    }
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
        <div className="post-card-main-div">   
            <div className="post-card-avatar-div">
            <Avatar icon={<UserOutlined/>} className="user-dp" size={45}/>
            </div>
            <div className="post-card-desc-div">
                {userId ?
                <div className="post-author-div">{postDesc.postBy}</div>
                :
                <div className="post-author-div"> <Link to={`/user/${postDesc.authorId}`} >{postDesc.postBy}</Link> </div>
                }
                <div className="post-date-div">{moment(postDesc.createdAt.toDate()).fromNow()}</div>
                <div className="postDesc-div">{postDesc.post}</div> 
                <div className="likes-comments-div">
                    <div className="likes-div">
                        <span className="likes-type" onClick={()=>changeLike(postDesc)}> {likeDisplay(postDesc)} </span>  <span className="noOfLikes-div"> {postDesc.likes} <span className="sparks-title">  sparks </span>   </span>
                    </div>
                    <div className="comments-div">
                       <TextArea autoSize className="comment-area"> </TextArea> 
                       <SendOutlined className="send-comment-icon" />
                        <Avatar icon={<UserOutlined/>} className="comment-avatar" />
                    </div>

                </div>

            </div>
            
        </div>
    )
}

export default Post