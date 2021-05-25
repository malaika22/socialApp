import React, { useContext } from 'react'
import QuotesCard from './QuotesCard/QuotesCard'
import TagContainer from './TagsContainer/TagsContainer'
import './styles.scss'
import { QuotesContext } from '../../contexts/QuotesContex'

const QuotesContainer = () => {
    const {quotes, loading} = useContext(QuotesContext)
    console.log('quotes in container', quotes)
    return(
        <div className="quotes-main-container">
            <div className="quotes-card-main-container">
               { loading !== true &&
                   (quotes || []).map(quote => {
                       console.log(quote)
                   return <QuotesCard quote={quote}/>})
               } 
            </div>
            <div className="tags-main-container">
                <TagContainer />
            </div>
        </div>
    )
}

export default QuotesContainer