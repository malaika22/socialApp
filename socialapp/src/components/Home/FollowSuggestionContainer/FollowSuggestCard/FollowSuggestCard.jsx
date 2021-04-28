import React from 'react'
import {Avatar} from 'antd'
import {UserOutlined, UserAddOutlined} from '@ant-design/icons'
import './styles.scss'

const FollowSuggestCard = () =>{
    return(
        <div className="follow-card-main-div">
            <div className="follow-card-content-div">
                <div className="avatar-div">
                    <Avatar size={40} icon={<UserOutlined/>} className="follow-avatar"/>
                </div>
                <div className="user-content">
                    <div className="user-name">Malaika Afridi</div>
                    <div className="user-bio">Neque porro quisquam est qui dolorem ipsum quia dolor sit ... </div>
                </div>
                <div className="follow-button-div">
                    <UserAddOutlined className="add-user-icon"/>
                </div>
            </div>
        </div>
    )
}

export default FollowSuggestCard