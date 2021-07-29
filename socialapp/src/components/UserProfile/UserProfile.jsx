import React, { useContext, useEffect, useState } from 'react';
import {Avatar, Button, Input} from 'antd'
import Icon ,  {UserOutlined, EditOutlined} from '@ant-design/icons'
import { PostsContext } from '../../contexts/PostsContext';
import { UserContext } from '../../contexts/UserContext';
import Post from '../Home/PostsContainer/Post/Post';
import './styles.scss'

const BirthdayCakeIcon = () =>{
    return(
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="birthday-cake" class="svg-inline--fa fa-birthday-cake fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 384c-28.02 0-31.26-32-74.5-32-43.43 0-46.825 32-74.75 32-27.695 0-31.454-32-74.75-32-42.842 0-47.218 32-74.5 32-28.148 0-31.202-32-74.75-32-43.547 0-46.653 32-74.75 32v-80c0-26.5 21.5-48 48-48h16V112h64v144h64V112h64v144h64V112h64v144h16c26.5 0 48 21.5 48 48v80zm0 128H0v-96c43.356 0 46.767-32 74.75-32 27.951 0 31.253 32 74.75 32 42.843 0 47.217-32 74.5-32 28.148 0 31.201 32 74.75 32 43.357 0 46.767-32 74.75-32 27.488 0 31.252 32 74.5 32v96zM96 96c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40z"></path></svg>
    )
}

const UserProfile = ({userId}) =>{
    const {users, currentUser, handleBioUpdate} = useContext(UserContext)
    const {posts} = useContext(PostsContext)
    const selectedUser = (users || []).filter(user => user.uid === userId)[0]
    const userPosts = (posts|| []).filter(post => post.authorId=== userId)
    const [updateBio, setUpdateBio] = useState(false)
    const [updateUserBio, setUpdateUserBio] = useState((selectedUser || {}).bio)
    const [bioLimit, setBioLimit] = useState("")
    const { TextArea } = Input

    const updateBioHandler = (e) =>{
        console.log('e,', e)
        if(e.key === "Enter"){
            console.log(e ,"in enter")
            setUpdateBio(false)
            //updateUserBio(e.target.value)
            handleBioUpdate(currentUser.userDocId, updateUserBio)
        }
    }

    const handleUpdateButton = () =>{
        setUpdateBio(!updateBio)
        if(updateUserBio!== selectedUser.bio) {
            handleBioUpdate(currentUser.userDocId, updateUserBio)
        }
    }

    const handleOnChangeBio = (e) =>{
        if(e.target.value.length <= 50){
            setUpdateUserBio(e.target.value)
            setBioLimit("")
        } else {
            setBioLimit("Bio can't be more than 10 words")
        }
    }
        return(
            <div className="user-profile-main-div">
                <div className="user-profile-inner-div">
                    <div className="user-profile-info-div">
                        <Avatar size={70} icon={<UserOutlined />} className="user-profile-avatar"/>
                        <div className="user-name-div">
                          <span className="user-name"> {(selectedUser || {}).username}  </span> 
                        </div> 
                        {
                            selectedUser.uid === currentUser.uid ? 
                            <div className="bio-div">
                                {
                                    updateBio ? [ 
                                    <TextArea autoSize showCount value={updateUserBio} onChange={handleOnChangeBio} onKeyPress={updateBioHandler} maxLength={50} />
                                    , bioLimit ? <span className="bio-limit-error">{bioLimit}</span> : <></>
                                ]
                                    :  <span className="user-bio"> {(selectedUser || {}).bio}  </span> 
                                }

                                <div onClick={handleUpdateButton} className="edit-div"><EditOutlined className="edit-icon"/></div>
                            </div> : 
                            <div className="bio-div">
                                <span className="user-bio"> {(selectedUser || {}).bio}  </span> 
                            </div> 
                        }

                        {/* Add a parent div for code optimzation */}
                        <div className="user-general-info">
                        
                        <div className="user-birth-div">
                           <Icon component={BirthdayCakeIcon} className="profile-icons"/>  <span className="user-birth">{(selectedUser || {}).dateOfBirth}  </span> 
                        </div>
                        <div className="gender-div">
                             <UserOutlined className="gender-icons"/>  <span className="user-gender"> {(selectedUser || {}).gender} </span> 
                        </div>
                        <div className="followers-div">
                            <span className="followers-number">30</span> Followers
                        </div>
                        <div className="following-div">
                           <span className="following-number"> 30 </span>  Following
                        </div>
                        </div>
                        {/* Add </div> */}
                    </div>
                </div>
                    <div className="user-posts-div">
                        {/*<div className="posts-header">Posts</div>*/}
                        <div className="posts-container">
                            {userPosts.map(post => <Post postDesc={post}/>)}
                        </div>
                    </div>
            </div>

        )
    }

export default UserProfile