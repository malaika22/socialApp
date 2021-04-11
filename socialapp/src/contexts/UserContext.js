import React, {createContext, useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import firebase from '../fbConfig'


export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    console.log(user)
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            if(user) {
              console.log(user)
              setUser(user)
            }  else {
                // eslint-disable-next-line no-restricted-globals
                history.push('/login')
            }
          })
    })



    return(
        <UserContext.Provider
        value={{
            user: user
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default withRouter(UserContextProvider)

