import React from 'react'
import './styles.scss'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Post = ({postDesc}) =>{
    console.log(moment(postDesc.createdAt.toDate()).fromNow())
    console.log(postDesc)
    return (
        <div>   
            <div>
            <Link to={`/user/${postDesc.authorId}`} >{postDesc.postBy}</Link></div>
            <div>{postDesc.post}</div> 
            <div>{postDesc.likes}</div> <span>{moment(postDesc.createdAt.toDate()).fromNow()}</span>
        </div>
    )
}

export default Post