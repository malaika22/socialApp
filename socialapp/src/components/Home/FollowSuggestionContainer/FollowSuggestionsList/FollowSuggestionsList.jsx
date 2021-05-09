import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../contexts/UserContext'
import FollowSuggestCard from '../FollowSuggestCard/FollowSuggestCard'
import './styles.scss'

const FollowSuggestionsList = () =>{
    const {users, followers, currentUser} = useContext(UserContext)
    const [followersList, setFollowersList] = useState(followers)
    
    useEffect(()=>{
        console.log("in follow effect")
        console.log(users)
        if(users) {
            gettingFollowersUser()
        }

    }, [users])


    const gettingFollowersUser = () =>{
        console.log(users)
        console.log(currentUser)
        const followerUser = (users || []).filter(user => user.uid !== (currentUser || {}).uid) ;
            ((currentUser || {}).followers || []).map(follower => {
             for(let i in followerUser) {
                if(follower === followerUser[i].uid){
                    followerUser.splice(i, 1)
                }
            }
        })
        setFollowersList(followerUser)
    } 


    return(
        <div className="follow-list-container">
            <div className="follow-heading">Follow Suggestions</div>
            <div className="follow-card-container">
                {(followersList || []).map(user => <FollowSuggestCard followUser={user}/>)}
            </div>

        </div>
    )
}

export default FollowSuggestionsList