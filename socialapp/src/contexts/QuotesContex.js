import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { UserContext } from './UserContext'
export const QuotesContext = createContext()

export const QuotesContextProvider = ({children}) =>{
    const {currentUser} = useContext(UserContext)
    const [quotes, setQuotes] = useState([])
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( ()=>{
            getQuoteData()
            getTagsData()
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

    const getTagsData = async () =>{
            axios.get('https://api.quotable.io/tags')
            .then(res=>{
                console.log('res data',res.data)
                const tagsData = res.data.filter(tag=> tag.quoteCount > 10)
                console.log('tags Data', tagsData)
                setTags([...tagsData])
            }).catch(err =>{
                console.log('error in tags', err)
            })
    }

    const changeShareStatus = (quote) => {
            const updatedQuotes = quotes.map(qut =>   
                qut._id === quote._id ?
                {
                    ...quote,
                    shareStatus: 'shared'
                } : {
                    ...qut
                }
            )
            setQuotes([...updatedQuotes])
    }


        return(
            <QuotesContext.Provider value={{
                quotes : quotes,
                loading : loading,
                changeShareStatus: changeShareStatus,
                tags : tags 
            }}>
                {children}
            </QuotesContext.Provider>
        )
}