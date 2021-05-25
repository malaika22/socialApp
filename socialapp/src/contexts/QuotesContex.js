import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { UserContext } from './UserContext'
export const QuotesContext = createContext()

export const QuotesContextProvider = ({children}) =>{
    const {currentUser} = useContext(UserContext)
    const [quotes, setQuotes] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
            getQuoteData()
    }, [currentUser])

    console.log('quotes' , quotes)

    const getQuoteData = async() =>{

        try {
            const getQuoteData = await axios.get('https://api.quotable.io/quotes?limit=')
            setQuotes(getQuoteData.data.results)
            setLoading(false)

        }
        catch(err) {
            console.log('error', err)
        }
           /* const getQuotes = await axios.get('https://api.quotable.io/quotes?limit=').then(res=>{
                console.log(res.data)
            }).catch(err =>{
                console.log('err', err)
            })
            console.log(getQuotes) */
    }
        return(
            <QuotesContext.Provider value={{
                quotes : quotes,
                loading : loading
            }}>
                {children}
            </QuotesContext.Provider>
        )
}