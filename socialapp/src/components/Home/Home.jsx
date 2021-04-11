import React from 'react'
import NavHeader from '../NavHeader/NavHeader'
import PostContainer from '../PostsContainer/PostsContainer'
import './styles.scss'

const Home = () =>{
    return (
        <div>
            <NavHeader />
            <PostContainer />
        </div>
    )
}

export default Home