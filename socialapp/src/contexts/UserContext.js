import React, {createContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import firebase from '../fbConfig'


export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [users, setUsers] = useState(null)
    const history = useHistory()
    const db = firebase.firestore()
    console.log(currentUser)
    console.log("in context")

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
                //history.push('/login')
            }
          })

          //firebase.firestore()
    },[])

    const getCurrentUserData = (user) =>{
        const dataArr = []
        db.collection("users").onSnapshot(snapshot =>{
            snapshot.forEach(doc=>{
                console.log(doc.data().uid)
                console.log(user.uid)
                 dataArr.push(doc.data())
                if(doc.data().uid === user.uid){
                    setCurrentUser(doc.data())
                }
            })
            setUsers([...dataArr])
        })
    }

   const handleLogout = () =>{
        firebase.auth().signOut()
        .then(res=>{
            console.log("Successfully logged in")
            setCurrentUser(null)
            history.push('/login')
        })
        .catch(err => {
            console.log("error logging out" , err)
        })
    }





    return(
        <UserContext.Provider
        value={{
            currentUser: currentUser,
            handleLogout: handleLogout,
            users: users
        }}>
            {children}
        </UserContext.Provider>
    )
}



