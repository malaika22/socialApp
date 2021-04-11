import React, {useState, useContext} from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {Form, Input, Button} from 'antd'
import {Link, Redirect, useHistory} from 'react-router-dom'
import {UserContext} from '../../contexts/UserContext'
import firebase from '../../fbConfig'
import './styles.scss'


const Login = () =>{
  const history = useHistory()
  const {user} = useContext(UserContext)
  console.log(user)
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
                history.push('/home')
                
            }).catch(err=>{
                console.log('user not present')
                setCredentials({
                    ...credentials,
                    error: `This user doesn't exist, click on the Signup button to register`
                })
            })
        }
      
    }


    if(user) {
      console.log("in login")
      console.log(user)
      return <Redirect to="/home" />}
    return(
        <div>
      <Form
      name="login-form"
      onFinish={finishHandler}
      >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input onChange={changeHandler}
        placeholder="Enter your email here"
        type="email"
        name="email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
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
                <p>Not registered? Signup <Link to="/signup"><span>here</span></Link></p>
      <Form.Item>
        <Button type="primary" htmlType="submit" key="submit" onClick={finishHandler}>
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
    )
}

export default Login