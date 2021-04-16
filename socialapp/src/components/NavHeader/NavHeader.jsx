import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from 'antd'
import { UserContext } from '../../contexts/UserContext'
import firebase from '../../fbConfig'
import './styles.scss'


const NavHeader = () =>{
    const {handleLogout} = useContext(UserContext)
 
    console.log("in nav")
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/quotes">Quotes</Link>
            <Link to="/music">Music</Link>
            <Button type="primary" onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default NavHeader