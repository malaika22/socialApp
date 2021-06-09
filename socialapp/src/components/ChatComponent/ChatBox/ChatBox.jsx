import React, { useContext, useState } from 'react'
import {Layout, Input, Button} from 'antd'
import moment from 'moment'
import { MessagesContext } from '../../../contexts/MessagesContext'
import firebase from '../../../fbConfig'
import { UserContext } from '../../../contexts/UserContext'


const Message = ({msg}) =>{
    const check = moment(msg.timeStamp.toDate()).calendar()
    return(
        <div>
            <div>
                {msg.author} 
            </div>
            <div>{msg.msg}</div>
            <div>{check}</div>
        </div>
    )
}
const ChatBox = () => {
    const db = firebase.firestore()
    const {TextArea} = Input
    const {Content} = Layout
    const {currentUser} = useContext(UserContext)
    const {messages, handleSubmitMessage} = useContext(MessagesContext)
    const [message , setMessage] = useState('')
    const handleMsgChange = (e) =>{
        setMessage(e.target.value)
    }

    const onMsgSend = (msg) =>{
       handleSubmitMessage(msg)
       setMessage('')
    }

    const handleKeyPress = (e) =>{
        if(e.key==='Enter'){
            e.preventDefault()
            onMsgSend(message)
        }

    }

    console.log(messages)


    return (
            <>
                <div>Message box</div>
                {messages.map(msg => {
                    return <Message msg={msg}/>
                })}
                <div>
                
                </div>
                
                <TextArea rows={6} 
                onChange={handleMsgChange} 
                name="message" 
                value={message}
                onKeyDown={handleKeyPress}
                />
                <Button 
                onClick={()=>onMsgSend(message)}
                >Send</Button>
            </>
           
    )
}

export default ChatBox