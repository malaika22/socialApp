import React, { createContext, useContext, useEffect, useState } from 'react'
import firebase from '../fbConfig'
import { UserContext } from './UserContext'

export const MessagesContext = createContext()

export const MessagesContextProvider = ({children}) => {
    const db = firebase.firestore()
    const [messages , setMessages] = useState([])
    const {currentUser} = useContext(UserContext)


    useEffect(()=>{
            db.collection("messages").onSnapshot(snapshot =>{
                const dataArr = [];
                console.log("in message useEffect")
                snapshot.forEach(doc =>{
                    dataArr.push(doc.data())
                })

                setMessages(dataArr)
            })
            
    },[])

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