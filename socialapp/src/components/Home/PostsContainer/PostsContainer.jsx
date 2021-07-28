import React, {useState, useContext} from 'react'
import {Button, Input, Avatar} from 'antd'
import {UserOutlined, SendOutlined} from '@ant-design/icons'
import PostsList from './PostsList/PostsList'
import { PostsContext } from '../../../contexts/PostsContext';
import AddPostModal from '../../UIModals/AddPostModal/AddPostModal'
import './styles.scss'


const PostContainer = () =>{
    const [showPostModal, setShowPostModal] = useState(false)
    const {TextArea} = Input
    const {createPost} = useContext(PostsContext)
    const [post , setPost] = useState("")
    const handleKeyAddPost = (e) =>{
        console.log('enter key', e)
        if(e.key === "Enter") {
            createPost(post)
            e.preventDefault()
            setPost("")
        }
    }

    const handleAddPost = () =>{
        createPost(post)
        setPost("")
    }

    return(
        <div className="post-main-container">
            <div className="add-post-container">
                    <div className="add-post-div">
                        <Avatar icon={<UserOutlined/>} className="profile-avatar" size={45}/>
                        <TextArea autoSize className="post-area" placeholder="Post your thoughts..." value={post} onChange={(e)=>setPost(e.target.value)} onKeyPress={handleKeyAddPost}/>
                        <SendOutlined className="add-post-icon" onClick={handleAddPost}/>
                    </div>
            </div>
            <PostsList />
        </div>
    )

}

export default PostContainer