import React, { useContext, useState } from 'react'
import {Layout, Input, Button} from 'antd'
import {SendOutlined} from '@ant-design/icons';
import moment, { monthsShort } from 'moment'
import { MessagesContext } from '../../../contexts/MessagesContext'
import firebase from '../../../fbConfig'
import { UserContext } from '../../../contexts/UserContext'


const Message = ({msg, nextMsg, currentUser}) =>{
    const time = moment(msg.timeStamp.toDate()).calendar()
    return(
        <>
        <div className={`msgBox ${msg.author === currentUser.username && "mine"}`}>
            <div className="msg-div">{msg.msg}</div>
            <div className="time-div">{time}</div>
        </div>
        </>
    )
}
const ChatBox = () => {
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

    const getAuthor = (msg , nextMsg, prevMsg) =>{
        if(!prevMsg) {
            return(<div>{msg.author}</div>)
        } else if( prevMsg.author!==msg.author) {
            return(<div>{msg.author}</div>)
        }
    }
     

    

    return (
            <div className="chatBox-container">
                <>
                {messages.map((msg,i) => {
                    return (
                        <>
                            <div className={`author-name ${msg.author === currentUser.username && "mine"}`}>{getAuthor(msg, messages[i+1], messages[i-1])}</div>
                            <Message msg={msg} nextMsg={messages[i+1]} currentUser={currentUser}/>
                        </>
                    )
                  
                })}
                </>
                
                <TextArea rows={3} 
                onChange={handleMsgChange} 
                name="message" 
                value={message}
                onKeyDown={handleKeyPress}
                className="msg-area"
                > 
                </TextArea>
                <SendOutlined 
                    onClick={()=>onMsgSend(message)}
                    className="send-button"
                />

           
            </div>
           
    )
}

export default ChatBox