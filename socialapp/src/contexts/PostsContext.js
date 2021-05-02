import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import {UserContext} from './UserContext'
import firebase from '../fbConfig'
//import { update } from 'lodash';

export const PostsContext = createContext();

export const PostsContextProvider = ({children}) =>{
    const _ = require('lodash');
    const db = firebase.firestore()
    const {currentUser} = useContext(UserContext)
    const [posts, setPosts] = useState([])
   
    useEffect(()=>{
        console.log('in useEffect PostContext')
        db.collection("posts").onSnapshot(snapshot => {
            const dataArr =[]
            snapshot.forEach(doc => {
                dataArr.push(doc.data())
            })
            sortingPosts(dataArr)
        })
    }, [])

    const sortingPosts = (dataArr) =>{
       const sortedPost =  _.sortBy(dataArr, (o)=>{
            return o.createdAt.toDate()
        }).reverse()
        //console.log(sortedPost)
        setPosts([...sortedPost])
    }

    const updatePost = (updatedPost) => {
        setPosts(updatedPost)
    }

    const createPost = (post) =>{
            console.log(post)
            console.log("in create post")
            const postDocRef = db.collection("posts").doc()
            postDocRef.set({
                post,
                authorId: currentUser.uid,
                postBy: currentUser.username,
                createdAt: new Date(),
                likes: 0,
                comments: [],
                id: postDocRef.id
            })

            

    }
    
    const likePost = (selectedPostId) =>{
            const postLikeRef = db.collection("posts").doc(selectedPostId);
             postLikeRef.update({
                        likes: firebase.firestore.FieldValue.increment(1)
                    })
    }   

    const dislikePost = (selectedPostId) =>{
        const postLikeRef = db.collection("posts").doc(selectedPostId);
             postLikeRef.update({
                        likes: firebase.firestore.FieldValue.increment(-1)
                    })
    }

    // Adding Comments to Posts 
    const addComment= (selectedPost, comment) => {
        db.collection("posts").doc(selectedPost.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                commentAuthor : selectedPost.postBy,
                postId: selectedPost.id,
                comment: comment ,
                commentAt : new Date(),
                authorId : selectedPost.authorId
            })
        })
    }




    return(
        <PostsContext.Provider
        value={{
            createPost: createPost,
            posts: posts,
            likePost : likePost,
            dislikePost : dislikePost,
            updatePost:updatePost,
            handleAddComment : addComment
        }}>
            {children}
        </PostsContext.Provider>
    )
}

