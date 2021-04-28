import React, {useContext} from 'react'
import { UserContext } from '../../contexts/UserContext'
import { Redirect } from 'react-router'
import NavHeader from '../NavHeader/NavHeader'
import FollowSuggestionsContainer from './FollowSuggestionContainer/FollowSuggestionsContainer'
import PostContainer from './PostsContainer/PostsContainer'
import './styles.scss'

const Home = () =>{
    return (
        <div className="home-main-container">
            <FollowSuggestionsContainer />
            <PostContainer />
        </div>
    )
}

export default Home