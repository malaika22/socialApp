import React, { useContext } from 'react';
import {Avatar} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import { PostsContext } from '../../contexts/PostsContext';
import { UserContext } from '../../contexts/UserContext';
import Post from '../PostsContainer/Post/Post';
import './styles.scss'

const UserProfile = ({userId}) =>{
    const {users} = useContext(UserContext)
    const {posts} = useContext(PostsContext)
    const selectedUser = (users || []).filter(user => user.uid === userId)[0]
    //const {} = useContext(Posts)
    const userPosts = (posts|| []).filter(post => post.authorId=== userId)
    console.log(selectedUser)
    console.log(userPosts)
        return(
            <div>
                <div>
                    <Avatar size={70} icon={<UserOutlined />}/>
                   <div>
                      User name : {(selectedUser || {}).username} 
                    </div> 
                    <div>
                        Date of birth : {(selectedUser || {}).dateOfBirth}
                    </div>
                    <div>
                        Gender : {(selectedUser || {}).gender}
                    </div>
                   <div>
                    Bio : {(selectedUser || {}).bio}
                    </div> 
                </div>
                <div>
                    <h1>Posts</h1>
                    {userPosts.map(post => <Post postDesc={post}/>)}
                </div>
            </div>

        )
    }

export default UserProfile