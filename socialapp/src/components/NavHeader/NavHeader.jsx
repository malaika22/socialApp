import React, { useContext } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Button } from 'antd'
import { UserContext } from '../../contexts/UserContext'
import firebase from '../../fbConfig'
import './styles.scss'


const NavHeader = ({children}) =>{
    const {handleLogout, currentUser} = useContext(UserContext)
 
    console.log("in nav")
    if(!currentUser) return <div>you're not login click here to login <Link to="/login">here</Link></div>
    return (
        <div>
            <div>
            <Link to="/">Home</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/quotes">Quotes</Link>
            <Link to="/music">Music</Link>
            <Button type="primary" onClick={handleLogout}>Logout</Button>
            </div>
            {children}
        </div>
    )
}

export default NavHeader