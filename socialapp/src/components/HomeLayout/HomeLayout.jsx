import React, { useContext, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Button, Menu, Layout, Dropdown, Avatar } from 'antd'
import { UserOutlined, CaretDownOutlined, HomeFilled, WechatFilled } from '@ant-design/icons';
import Icon from '@ant-design/icons'
import { UserContext } from '../../contexts/UserContext'
import './styles.scss'



const NavQuoteIcon = () =>{
    return (
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" className="svg-inline--fa fa-quote-left fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>
    )
}


const NavMusicIcon = () =>{
    return(
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="music" className="svg-inline--fa fa-music fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"></path></svg>
    )
}


const HomeLayout = ({children}) =>{
    const {handleLogout, currentUser} = useContext(UserContext)
    //if(!currentUser) return <div>you're not login click here to login <Link to="/login">here</Link></div>
    const [current, setCurrent] = useState("home")
    const {Content, Header} = Layout
    const handleMenuClick = (e) => {
        setCurrent(e.key)
    }

    const dropDownOptions = () => {
        return (
            <Menu>
                <Menu.Item>
                    <Link to={`/user/${currentUser.uid}`}>My Profile</Link>
                </Menu.Item>
                <Menu.Item onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>
        )
    }

    return (
      <Layout className="home-layout">
       
        <div className="nav-main-div">
            <div className="logo-div">
                <Link to="/">Logo</Link>
            </div>
            <div className="nav-div">
                <Menu onClick={handleMenuClick} mode="horizontal" selectedKeys={[current]} className="nav-menu">
                    <Menu.Item key="home" className="nav-item">
                        <Link to="/"><span className="nav-icons"><HomeFilled /></span>Home</Link>
                    </Menu.Item>
                    <Menu.Item key="chat" className="nav-item"> 
                        <Link to="/chat"> <span className="nav-icons"><WechatFilled /></span>Chat</Link>
                    </Menu.Item>
                    <Menu.Item key="quotes" className="nav-item">
                        <Link to="/quotes"><span className="nav-icons"><Icon component={NavQuoteIcon}/></span> Quotes</Link>
                    </Menu.Item>
                    <Menu.Item key="music" className="nav-item">
                        <Link to="/music"><span className="nav-icons"><Icon component={NavMusicIcon}/></span> Music</Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div className="profile-dropDown-div">
                <div className="profile-pic-div">
                    <Avatar icon={<UserOutlined/>} />
                </div> 
                <Dropdown overlay={dropDownOptions} size={40} overlayClassName="dropDrown-overlay" className="dropDown">
                    <div className="dropDown-div">
                        {(currentUser || {}).username} <span className="arrow-down-icon"><CaretDownOutlined /></span>
                    </div>
                </Dropdown>    
            </div>
        </div>
     
        <Content className="home-layout-content">
            {children}
        </Content>
      
       </Layout>

    )
}

export default HomeLayout