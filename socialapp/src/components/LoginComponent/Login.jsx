import React, {useState, useContext} from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {Form, Input, Button, Layout} from 'antd'
import {Link, Redirect, useHistory} from 'react-router-dom'
import {UserContext} from '../../contexts/UserContext'
import firebase from '../../fbConfig'
import signUp from '../../assests/signUp.png'
import './styles.scss'


const Login = () =>{
  const {Content} = Layout
  const history = useHistory()
  const {currentUser} = useContext(UserContext)
  console.log(currentUser)
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        error: ''
    })

    const changeHandler = (e) =>{
        setCredentials({
            ...credentials,
            [e.target.name] : e.target.value 
        })
    }

    const finishHandler = () =>{
        console.log('Pressed submit button')
        console.log(credentials)
        // Login in the user on submit button
        if(!credentials.error) {
            login()
        }
        
    }

    const login = () =>{
        if(credentials.password && credentials.email) {
            firebase.auth().signInWithEmailAndPassword(credentials.email , credentials.password)
            .then(res =>{
                console.log('Successfully logged in')

                //Go to the home page
                history.push('/')
                
            }).catch(err=>{
                console.log('user not present')
                setCredentials({
                    ...credentials,
                    error: `This user doesn't exist, click on the Signup button to register`
                })
            })
        }
      
    }

    console.log('login')


    /*if(currentUser) {
      console.log("in login")
      console.log(currentUser)
      return <Redirect to="/" />} */
    return(
            <div className="login-main-div">
              <div className="login-left-screen">
                    <div className="left-screen-content-div">
                        <div className="left-screen-content">
                          Your new social media platform with stuff that actually matters
                        </div>
                        <div className="left-screen-img">
                          <img src={signUp} alt="Sign up"/>
                        </div> 
                    </div>
              </div>

              <div className="login-right-screen">
                <Form
                name="login-form"
                onFinish={finishHandler}
                className="login-form form"
                >
                  <div className="login-heading">
                        Sign In
                  </div>
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                    className="login-label"
                  >
                    <Input onChange={changeHandler}
                    placeholder="Enter your email here"
                    type="email"
                    name="email" 
                    className="login-input input-field"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    className="login-label"
                  >
                    <Input.Password
                            placeholder="Enter your password here"
                            iconRender={(visible) =>
                              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                            className="password-input input-field"
                            onChange={changeHandler}
                            name="password"
                    />
                  </Form.Item>
                        {credentials.error&& <p>{credentials.error}</p>}
                    <Form.Item className="button-label">
                      <Button type="primary" htmlType="submit" key="submit" onClick={finishHandler}
                      className="login-button"
                      >
                        Submit
                      </Button> 
                    </Form.Item>
                     <p>Not registered? Signup <Link to="/signup"><span>here</span></Link></p>
                  </Form>
                 
              </div>

            </div>
    )
}

export default Login