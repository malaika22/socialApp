import React, { createContext, useContext, useEffect, useState } from 'react'
import firebase from '../fbConfig'
import { UserContext } from './UserContext'

export const MessagesContext = createContext()

export const MessagesContextProvider = ({children}) => {
    const db = firebase.firestore()
    const _ = require('lodash');
    const [messages , setMessages] = useState([])
    const {currentUser} = useContext(UserContext)


    useEffect(()=>{
        console.log("in message use effect")
            db.collection("messages").onSnapshot(snapshot =>{
                const dataArr = [];
                console.log("in message useEffect")
                snapshot.forEach(doc =>{
                    dataArr.push(doc.data())
                })
                console.log(dataArr)
                sortingMessages(dataArr)
            })
            
    },[])

       const sortingMessages = (dataArr) =>{
           console.log(dataArr)
       const sortedMessages =  _.sortBy(dataArr, (o)=>{
           console.log(o)
            return o.timeStamp.toDate()
        })
        //console.log(sortedPost)
        setMessages([...sortedMessages])
    }

    const handleSubmitMessage = (msg) =>{
        console.log("in send message")
        db.collection("messages").add({
            msg : msg,
            user_id : currentUser.uid,
            author: currentUser.username,
            timeStamp : new Date()
        })
    }




    return(
    <MessagesContext.Provider
    value={{
        messages : messages,
        //handleSubmitMsg: handleSubmitMsg
        handleSubmitMessage: handleSubmitMessage
    }}>
        {children}
    </MessagesContext.Provider>
    )

}