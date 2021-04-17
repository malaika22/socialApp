import React, { createContext } from 'react'


export const MessagesContext = createContext()

export const MessagesContextProvider = ({children}) => {
    return(
    <MessagesContext.Provider
    value={{}}>
        {children}
    </MessagesContext.Provider>
    )

}