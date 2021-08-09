import React from 'react'
import ChatBox from './ChatBox/ChatBox'
import './styles.scss'

const ChatSection = () =>{
    return(
        <div className="chat-container">
            <div className="chatSection-header">
                Chatroom
            </div>
            <ChatBox />
        </div>
   
    )
}

export default ChatSection