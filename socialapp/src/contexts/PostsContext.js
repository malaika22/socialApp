import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import {UserContext} from './UserContext'
import firebase from '../fbConfig'


export const PostsContext = createContext();

export const PostsContextProvider = ({children}) =>{
    const _ = require('lodash');
    const db = firebase.firestore()
    const {currentUser, followers} = useContext(UserContext)
    const [posts, setPosts] = useState([])
   // const [commnt ,setCommnt] = useState(true)
   //console.log(commnt)
    useEffect(()=>{
        console.log('in useEffect PostContext')
        db.collection("posts").onSnapshot(snapshot => {
            const dataArr =[]
            snapshot.forEach(doc => {
                dataArr.push(doc.data())
            })
            setPosts(dataArr)
        })
    }, [currentUser])

    //const sortingPosts = (dataArr) =>{
      // const sortedPost =  _.sortBy(dataArr, (o)=>{
        //    return o.createdAt.toDate()
        //}).reverse()
        //console.log(sortedPost)
        //setPosts([...sortedPost])
    //}

     /*  const gettingFollowersPost = (posts, followers) =>{
        const followerPostCheck = [];
         ((currentUser || {}).followers || []).map(follower => {
             console.log(follower);
            for(let i in posts) {
                if(follower === posts[i].authorId){
                    followerPostCheck.push(posts[i])
                }
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
        setPosts(sortedPost)
        //return sortedPost
    } */

    const updatePost = (updatedPost) => {
        setPosts(updatedPost)
        //setCommnt(true)
    }

    const createPost = async (post) =>{
            console.log(post)
            console.log("in create post")
            const postDocRef = db.collection("posts").doc()
            console.log(postDocRef)
            console.log(postDocRef.id)
            
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
    const addComment= (selectedPost, comment, commntCount) => {
        console.log("adding commnt")
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
            handleAddComment : addComment,
            //sortingPosts : sortingPosts
        }}>
            {children}
        </PostsContext.Provider>
    )
}

