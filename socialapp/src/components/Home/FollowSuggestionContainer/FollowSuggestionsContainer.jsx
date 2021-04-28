import React from 'react'
import FollowSuggestCard from './FollowSuggestCard/FollowSuggestCard'
import FollowSuggestionsList from './FollowSuggestionsList/FollowSuggestionsList'
import './styles.scss'

const FollowSuggestionsContainer = () =>{
    return(
        <div className="follow-suggestion-main-div">
            <FollowSuggestionsList />
        </div>
    )
}

export default FollowSuggestionsContainer