import React from 'react'
import FollowSuggestCard from '../FollowSuggestCard/FollowSuggestCard'
import './styles.scss'

const FollowSuggestionsList = () =>{
    return(
        <div className="follow-list-container">
            <div>Follow Suggestions</div>
            <div className="follow-card-container">
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
                <FollowSuggestCard />
            </div>

        </div>
    )
}

export default FollowSuggestionsList