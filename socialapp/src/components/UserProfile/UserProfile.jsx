import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './styles.scss'

const UserProfile = ({userId}) =>{
    const {users} = useContext(UserContext)
    const {bio, dateOfBirth, gender, uid, username} = (users || []).filter(user => user.uid === userId)
    console.log(bio , dateOfBirth, gender , uid ,username)
    return(
        <div>
            hello {userId}
        </div>
    )
}

export default UserProfile