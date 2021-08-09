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
    const [userLoading, setUserLoading] = useState(true)
    const [userState, setUserState] = useState(false)
  
    useEffect(()=>{
        console.log(' user load', userLoading)
        firebase.auth().onAuthStateChanged( user=>{
            if(user) {
                console.log('in auth user hay')
                setUserState(true)
                getCurrentUserData(user)
            }  else {
                console.log('no user')
                setCurrentUser(null)
                setUsers(null)
               //unsubscribe();
               history.push("/login")

            }
          })
          setUserLoading(false)
    },[])


    const getCurrentUserData = (user) =>{
        console.log('get current start')
          db.collection("users")
           .onSnapshot(snapshot =>{
                    const dataArr = []
                    snapshot.forEach(doc=>{
                        dataArr.push(doc.data())
                        if(doc.data().uid === user.uid){
                            setCurrentUser(doc.data())
                            setFollowers(doc.data().followers)
                        }
                    })
                    setUsers([...dataArr])
                    console.log('no error')
                })
    }

    const handleBioUpdate = (docId, updatedBio) =>{
        db.collection("users").doc(docId).update({
            bio : updatedBio
        })
    }   


   const handleLogout = () =>{
        //unsubscribe();
        firebase.auth().signOut()
        .then(res=>{
            console.log('in handle logout')
            //setUsers(null)
            setUserState(false)
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
            handleBioUpdate : handleBioUpdate,
            //gettingFollowersUser: gettingFollowersUser
            userLoading: userLoading,
            userState: userState
        }}>
            {children}
        </UserContext.Provider>
    )
}



