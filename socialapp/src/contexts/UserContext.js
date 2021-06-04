import React, {createContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import firebase from '../fbConfig'


export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [followers, setFollowers] = useState(null)
    const [users, setUsers] = useState(null)
    const history = useHistory()
    const db = firebase.firestore()

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            console.log("in auth changed")
            if(user) {
                console.log('in auth user hay')
                getCurrentUserData(user)
              
            }  else {
                // eslint-disable-next-line no-restricted-globals
                //history.push('/login')
            }
          })
          console.log(users)
          //firebase.firestore()
    },[])


    const getCurrentUserData = (user) =>{
        console.log('get current start')
        db.collection("users").onSnapshot(snapshot =>{
             const dataArr = []
            snapshot.forEach(doc=>{
                 dataArr.push(doc.data())
                if(doc.data().uid === user.uid){
                    setCurrentUser(doc.data())
                    setFollowers(doc.data().followers)
                }
            })
            setUsers([...dataArr])
        })
    }


   const handleLogout = () =>{
        firebase.auth().signOut()
        .then(res=>{
            console.log('in handle logout')
            //history.push('/login')
            setCurrentUser(null)
        })
        .catch(err => {
            console.log("error logging out" , err)
        })
    }


    const addFollower = (docId, followerId) => {
        console.log(docId)
        db.collection("users").doc(docId).update({
            followers : firebase.firestore.FieldValue.arrayUnion(followerId)
        })
    }


    return(
        <UserContext.Provider
        value={{
            currentUser: currentUser,
            handleLogout: handleLogout,
            users: users,
            followers : followers,
            addFollower : addFollower,
            //gettingFollowersUser: gettingFollowersUser
        }}>
            {children}
        </UserContext.Provider>
    )
}



