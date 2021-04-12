import React, { useContext, useState } from 'react'
import {Form, Modal, Input, Button} from 'antd'
import { PostsContext } from '../../../contexts/PostsContext';


const AddPostModal = ({setShowModal}) => {
    const {TextArea} = Input;
    const {createPost} = useContext(PostsContext)
    const [post, setPost] = useState('')
    const finishHandler = () =>{
        console.log("Clicked add post")
        // Add posts to database
        createPost(post)
        setShowModal(false)
    }
    const textChangeHandler = e =>{
        setPost(e.target.value)
        console.log(post)
    }
    return(
        <div>
            <Modal
            visible={true}
            onCancel={()=>setShowModal(false)}
            footer={null}
            >
                <Form
                name="addPostForm"
                onFinish={finishHandler}>
                    <Form.Item>
                        <TextArea rows={'4'} 
                        onChange={textChangeHandler}
                        value={post}
                        name="post"
                        />
                    </Form.Item>
                    <Button onClick={finishHandler}>Add Post</Button>
                    <Button onClick={()=> setShowModal(false)}>Cancel</Button>
                </Form>
            </Modal>

        </div>
    )
}

export default AddPostModal