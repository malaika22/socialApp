import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../fbConfig'
import './styles.scss'


const NavHeader = () =>{

    return (
        <div>
            <Link to="/home">Home</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/quotes">Quotes</Link>
            <Link to="/music">Music</Link>
        </div>
    )
}

export default NavHeader