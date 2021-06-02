import React, { useContext, useState } from 'react'
import QuotesCard from './QuotesCard/QuotesCard'
import TagContainer from './TagsContainer/TagsContainer'
import './styles.scss'
import { QuotesContext } from '../../contexts/QuotesContex'

const QuotesContainer = () => {
    const {quotes, loading, tags} = useContext(QuotesContext)
    const [filteredQuotes , setFilteredQuotes] = useState([...quotes])

    const handleTagClick = (tag) =>{
        const tempQuotes =  quotes.filter(quote => quote.tags.find(tg => tg === tag.name))
        setFilteredQuotes([...tempQuotes])
    }

    console.log('quotes in container', quotes)
    return(
        <div className="quotes-main-container">
            <div className="quotes-card-main-container">
               { loading !== true &&
                   (filteredQuotes || []).map(quote => {
                       console.log(quote)
                   return <QuotesCard quote={quote}/>})
               } 
            </div>
            <div className="tags-main-container">
                <TagContainer tags={tags} handleTagClick={handleTagClick}/>
            </div>
        </div>
    )
}

export default QuotesContainer