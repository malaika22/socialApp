import React, { useContext } from 'react'
import {Avatar} from 'antd'
import {UserOutlined, UserAddOutlined} from '@ant-design/icons'
import './styles.scss'
import { UserContext } from '../../../../contexts/UserContext'

const FollowSuggestCard = ({ followUser : {username , bio , uid}}) =>{
    const {addFollower, currentUser} = useContext(UserContext)

    const handleAddFollower = (userDocId , uid) =>{
        addFollower(userDocId, uid)
    }
    return(
        <div className="follow-card-main-div">
            <div className="follow-card-content-div">
                <div className="avatar-div">
                    <Avatar size={40} icon={<UserOutlined/>} className="follow-avatar"/>
                </div>
                <div className="user-content">
                    <div className="user-name">{username}</div>
                    <div className="user-bio">{bio}</div>
                </div>
                <div className="follow-button-div" onClick={()=> handleAddFollower(currentUser.userDocId, uid)}>
                    <UserAddOutlined className="add-user-icon"/>
                </div>
            </div>
        </div>
    )
}

export default FollowSuggestCard