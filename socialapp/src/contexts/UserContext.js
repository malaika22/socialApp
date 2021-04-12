import React, {createContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import firebase from '../fbConfig'


export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const history = useHistory()
    const db = firebase.firestore()
    console.log(currentUser)
    console.log("in context")


    const getCurrentUserData = (user) =>{
        db.collection("users").onSnapshot(snapshot =>{
            snapshot.forEach(doc=>{
                console.log(doc.data().uid)
                console.log(user.uid)
                if(doc.data().uid === user.uid){
                    setCurrentUser(doc.data())
                }
            })
        })
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            console.log("in auth changed")
            console.log(user)
            if(user) {
              console.log(user)
              getCurrentUserData(user)
              console.log(currentUser)
            }  else {
                // eslint-disable-next-line no-restricted-globals
                history.push('/login')
            }
          })

          firebase.firestore()
    },[])



    return(
        <UserContext.Provider
        value={{
            currentUser: currentUser
        }}>
            {children}
        </UserContext.Provider>
    )
}



