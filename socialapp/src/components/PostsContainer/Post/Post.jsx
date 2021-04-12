import React from 'react'
import './styles.scss'
import moment from 'moment'

const Post = ({postDesc}) =>{
    console.log(moment(postDesc.createdAt.toDate()).fromNow())
    return (
        <div>   
            <div>{postDesc.postBy}</div>
            <div>{postDesc.post}</div> 
            <div>{postDesc.likes}</div> <span>{moment(postDesc.createdAt.toDate()).fromNow()}</span>
        </div>
    )
}

export default Post