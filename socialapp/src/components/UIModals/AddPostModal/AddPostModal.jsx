import React from 'react'
import {Form} from 'antd'


const AddPostModal = () => {
    const finishHandler = () =>{
        
    }
    return(
        <div>
           <Form
           name="addPostForm"
           onFinish={finishHandler}>

           </Form>
        </div>
    )
}

export default AddPostModal