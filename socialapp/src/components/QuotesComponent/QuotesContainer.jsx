import React, { useContext, useState } from 'react'
import {Spin} from 'antd'
import QuotesCard from './QuotesCard/QuotesCard'
import TagContainer from './TagsContainer/TagsContainer'
import './styles.scss'
import { QuotesContext } from '../../contexts/QuotesContex'
import Loading from '../LoadingComponent/Loading/Loading'

const QuotesContainer = () => {
    const {quotes, loading, handleTag} = useContext(QuotesContext)
    const [filteredQuotes , setFilteredQuotes] = useState([...quotes])

    const handleTagClick = (tag) =>{
        const tempQuotes =  quotes.filter(quote => quote.tags.find(tg => tg === tag.name))
        setFilteredQuotes([...tempQuotes])
    }

    console.log('quotes in container', quotes)
    if(loading) {
        return <Loading />
    } else {
        return(
            <div className="quotes-main-container">
                <div className="quotes-card-main-container">
                    <div className="quotes-div">
                { loading !== true &&
                    (quotes || []).map(quote => {
                        console.log(quote)
                    return <QuotesCard quote={quote}/>})
                } 
                    </div>
                </div>
                <div className="tags-main-container">
                    <TagContainer handleTagClick={handleTag}/>
                </div>
            </div>
        )
    }

}

export default QuotesContainer