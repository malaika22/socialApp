import React, {useState} from 'react'
import PostsList from './PostsList/PostsList'
import AddPostModal from '../UIModals/AddPostModal/AddPostModal'
import './styles.scss'

const PostContainer = () =>{
    const [showPostModal, setShowPostModal] = useState(false)
    return(
        <div>
            <PostsList />
        

            {showPostModal && <AddPostModal/>}
        </div>
    )
}

export default PostContainer