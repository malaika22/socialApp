import React, { useContext } from 'react'
import './styles.scss'
import {Avatar} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../../contexts/UserContext'

const Post = ({postDesc}) =>{
    const {currentUser} = useContext(UserContext)
    const {userId} = useParams()
    console.log(moment(postDesc.createdAt.toDate()).fromNow())
    console.log(postDesc)
    console.log(currentUser)
    console.log(userId)
    return (
        <div>   
            <div>
            <Avatar icon={<UserOutlined/>}/>
            {userId ?
                <div>{postDesc.postBy}</div>
             :
             <Link to={`/user/${postDesc.authorId}`} >{postDesc.postBy}</Link>
            }
            </div>
            
            <div>{postDesc.post}</div> 
            <div>{postDesc.likes}</div> <span>{moment(postDesc.createdAt.toDate()).fromNow()}</span>
        </div>
    )
}

export default Post