import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../fbConfig'
import './styles.scss'


const NavHeader = () =>{

    const handleLogout = () =>{
        firebase.auth().signOut()
        .then(res=>{
            console.log("Successfully logged in")
        })
        .catch(err => {
            console.log("error logging out" , err)
        })
    }
    return (
        <div>
            <Link to="/home">Home</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/quotes">Quotes</Link>
            <Link to="/music">Music</Link>
            <Button type="primary" onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default NavHeader