import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { UserContext } from './UserContext'
export const QuotesContext = createContext()

export const QuotesContextProvider = ({children}) =>{
    const {currentUser} = useContext(UserContext)
    const [quotes, setQuotes] = useState([])
    const [tag, setTag] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        if(tag) {
          getTagsData(tag)
        } else {
            getQuoteData()
        }

            tagData()
    }, [currentUser, tag])


    //check again not important
    const getQuoteData = async() =>{
        try {
            const getQuoteData = await axios.get('https://api.quotable.io/quotes')
            setQuotes(getQuoteData.data.results)
            setLoading(false)
        }
        catch(err) {
            console.log('error', err)
        }
    }

    const tagData = async () =>{
        axios.get('https://api.quotable.io/tags').then(res=>{
        })
    }

    const getTagsData = async (tag) =>{
        if(tag) {
            console.log("in tags data", tag)
            axios.get(`https://api.quotable.io/quotes?tags=${tag}`)
            .then(res=>{
                console.log('in tags result', res.data)
                setLoading(false)
                setQuotes([...res.data.results])
                //setTags([...tagsData])
            }).catch(err =>{
                console.log('error in tags', err)
            })
    }
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
                handleTag: setTag
            }}>
                {children}
            </QuotesContext.Provider>
        )
}