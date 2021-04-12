import React, { createContext, useContext, useEffect, useState } from 'react'
import {UserContext} from './UserContext'
import firebase from '../fbConfig'

export const PostsContext = createContext();

export const PostsContextProvider = ({children}) =>{
    var _ = require('lodash');
    const db = firebase.firestore()
    const {currentUser} = useContext(UserContext)
    const [posts, setPosts] = useState([])
    console.log(currentUser)
    useEffect(()=>{
        db.collection("posts").onSnapshot(snapshot => {
            const dataArr =[]
            snapshot.forEach(doc => {
                console.log("pushing data to dataArr")
                dataArr.push(doc.data())
            })
            console.log("set posts")
            //setPosts([...dataArr])
            sortingPosts(dataArr)
        })
    }, [])

    const sortingPosts = (dataArr) =>{
       const sortedPost =  _.sortBy(dataArr, (o)=>{
            return o.createdAt.toDate()
        }).reverse()
        console.log(sortedPost)
        setPosts([...sortedPost])
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


    return(
        <PostsContext.Provider
        value={{
            createPost: createPost,
            posts: posts
        }}>
            {children}
        </PostsContext.Provider>
    )
}

