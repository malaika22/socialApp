import React, {useState} from 'react'
import {Button} from 'antd'
import PostsList from './PostsList/PostsList'
import AddPostModal from '../UIModals/AddPostModal/AddPostModal'
import './styles.scss'


const PostContainer = () =>{
    
    const [showPostModal, setShowPostModal] = useState(false)
   
    return(
        <div>
            <PostsList />
            <Button onClick={()=>setShowPostModal(true)}>Add post</Button>
            {showPostModal && <AddPostModal setShowModal={setShowPostModal}/>}
        </div>
    )

}

export default PostContainer