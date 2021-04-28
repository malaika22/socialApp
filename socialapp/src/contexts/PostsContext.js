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
    const alreadyLike = useRef(false)
    //console.log(currentUser)
    useEffect(()=>{
        console.log('in useEffect PostContext')
        db.collection("posts").onSnapshot(snapshot => {
            const dataArr =[]
            //console.log("in posts useEffect")
            snapshot.forEach(doc => {
                //console.log("pushing data to dataArr")
                dataArr.push(doc.data())
            })
            //console.log("set posts")
            //setPosts([...dataArr])
            sortingPosts(dataArr)
        })
    }, [currentUser])

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
            /*db.collection("projects").add({
                ...post,
                authorId: currentUser.uid,
                postBy: currentUser.username,
                createdAt: new Date(),
                likes: 0
            }) */
            console.log(post)
            console.log("in create post")
            const postDocRef = db.collection("posts").doc()
            postDocRef.set({
                post,
                authorId: currentUser.uid,
                postBy: currentUser.username,
                createdAt: new Date(),
                likes: 0,
                id: postDocRef.id
            })

            

    }

    const handleAddLike = (selectedPostId, selectedOption) =>{
        const postLikeRef = db.collection("posts").doc(selectedPostId)
        if(alreadyLike.current===true && selectedOption==='like'){
            postLikeRef.update({
                        likes : firebase.firestore.FieldValue.increment(-1)
                    })
        } else if(alreadyLike.current=== true  )
            if(alreadyLike.current===true && selectedOption==='like' ) {
               postLikeRef.update({
                    likes : firebase.firestore.FieldValue.increment(1)
                })
            } else if (alreadyLike.current===true && selectedOption==='dislike'){
                   postLikeRef.update({
                        likes : firebase.firestore.FieldValue.increment(-1)
                    })
            }
             else if(alreadyLike.current===false && selectedOption==='dislike') {
                postLikeRef.update({
                        likes : firebase.firestore.FieldValue.increment(-1)
                    })
            }
            

    }

    const finalHandleLike = (selectedPostId, selectedOption) =>{
         const postLikeRef = db.collection("posts").doc(selectedPostId)
         console.log('in final handle')
         console.log(alreadyLike.current)
         console.log(selectedOption)
            if(alreadyLike.current===false && selectedOption==='like') {
                console.log('already like false ')
                postLikeRef.update({
                    likes : firebase.firestore.FieldValue.increment(1)
                })
                alreadyLike.current=true
            }
            else if(alreadyLike.current===true && selectedOption==='dislike' ) {
                  postLikeRef.update({
                    likes : firebase.firestore.FieldValue.increment(-1)
                })
                alreadyLike.current=false
            } else if(alreadyLike.current===false && selectedOption==='dislike') {
                 postLikeRef.update({
                    likes : firebase.firestore.FieldValue.increment(-1)
                }) 
                alreadyLike.current=true
            } else if(alreadyLike.current===true && selectedOption==='like') {
                  postLikeRef.update({
                    likes : firebase.firestore.FieldValue.increment(1)
                })
                alreadyLike.current=false
            }
           /* else if(alreadyLike.current===false && selectedOption==='dislike') {
                  postLikeRef.update({
                    likes : firebase.firestore.FieldValue.increment(-1)
                })
            } */ /*else if(alreadyLike.current===true && selectedOption==='like') {
                postLikeRef.update({
                    likes : firebase.firestore.FieldValue.increment(1)
                }) */
                //alreadyLike.current=false
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



    const addLike = (selectedPostId , selectedOption) =>{
        console.log(selectedPostId)
        const postLikeRef = db.collection("posts").doc(selectedPostId)
        if(selectedOption==='like') {
            postLikeRef.update({
                        likes: firebase.firestore.FieldValue.increment(-1)
                    })
                alreadyLike.current=true
        }
        else {
                 postLikeRef.update({
                    likes : firebase.firestore.FieldValue.increment(1)
                })
                alreadyLike.current=false
        } 
        console.log(selectedOption)
        
            /*if(selectedOption==='like') {
                console.log('in increment', alreadyLike.current)
                postLikeRef.update({
                    likes : firebase.firestore.FieldValue.increment(1)
                })
                alreadyLike.current=true
                return
            } else if(selectedOption === 'dislike') {
                console.log('in decrement', alreadyLike.current)
                    postLikeRef.update({
                        likes: firebase.firestore.FieldValue.increment(-1)
                    })
                    alreadyLike.current=false
                    return
            }  */

            /*if(selectedOption==='like'){
                 postLikeRef.update({
                    likes : firebase.firestore.FieldValue.increment(1)
                })
            } else if(selectedOption==='dislike'){
                postLikeRef.update({
                        likes: firebase.firestore.FieldValue.increment(-1)
                    })
            } */
            /*else if(selectedOption==='like'){
               postLikeRef.update({
                    likes : firebase.firestore.FieldValue.increment(1)
                })
                alreadyLike.current=true
            } else if(selectedOption === 'dislike'){
                     postLikeRef.update({
                        likes: firebase.firestore.FieldValue.increment(-1)
                    })
                    alreadyLike.current=false
            } */

    }



    return(
        <PostsContext.Provider
        value={{
            createPost: createPost,
            posts: posts,
            addLike: finalHandleLike,
            alreadyLike: alreadyLike,
            likePost : likePost,
            dislikePost : dislikePost,
            updatePost:updatePost
        }}>
            {children}
        </PostsContext.Provider>
    )
}

