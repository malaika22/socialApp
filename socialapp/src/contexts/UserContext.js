import React, {createContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import firebase from '../fbConfig'


export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const history = useHistory()
    console.log(user)
    console.log("in context")
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            console.log("in auth changed")
            console.log(user)
            setUser(user)
            if(user) {
              console.log(user)
              setUser(user)
            }  else {
                // eslint-disable-next-line no-restricted-globals
                history.push('/login')
            }
          })
    },[])



    return(
        <UserContext.Provider
        value={{
            user: user
        }}>
            {children}
        </UserContext.Provider>
    )
}



