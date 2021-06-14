import React, { useState, useContext } from 'react'
import firebase from '../../fbConfig'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {Form, Input, Button, DatePicker, Select} from 'antd'
import {Link, Redirect, useHistory} from 'react-router-dom'
import {UserContext} from '../../contexts/UserContext'
import signUp from '../../assests/signUp.png'
import './styles.scss'

const SignUp = () =>{
    const [signUpUser, setSignUpUser] = useState({
        username: '',
        uid: '',
        email: '',
        bio: 'I love spark',
        gender: '',
        password: '',
        dateOfBirth: '',
        confirmPassword: ''
    })
    const {Option} = Select;
   const {TextArea} = Input;
   const {currentUser} = useContext(UserContext)
  let history = useHistory() 
    const db = firebase.firestore()

      const createUser = (res) =>{
        console.log(res)
        console.log(res.uid)
        const userDocRef = db.collection("users").doc()
          userDocRef.set({
            uid: res.uid,
            username: signUpUser.username,
            email: signUpUser.email,
            bio: signUpUser.bio,
            dateOfBirth: signUpUser.dateOfBirth,
            gender: signUpUser.gender,
            userDocId : userDocRef.id,
            followers: []
          })
      }

    const changeHandler = (e) =>{
      setSignUpUser({
        ...signUpUser,
          [e.target.name] : e.target.value
      })
    }

    const handleDateChange = (date, dateString) =>{
      setSignUpUser({
        ...signUpUser,
        dateOfBirth: dateString
      })
    }

    const handleGenderChange = (value) =>{
      setSignUpUser({
        ...signUpUser,
        gender: value
      })
    }
    const finishHandler = () =>{
      console.log(signUpUser)
        if((signUpUser|| {}).email && (signUpUser || {}).username){
            firebase.auth().createUserWithEmailAndPassword(signUpUser.email,signUpUser.password)
            .then(res=>{
              console.log("Successfully signed in")
              // Add user to database
              console.log(res)
              createUser(res.user)
              history.push('/')

            }).catch(err=>{
              console.log('Error signing up' , err)
            })
        }
    }
    return(
        <div className="login-main-div signup-main-div">
         
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
            name="signUp-form"
            finish={finishHandler}
            className="login-form form"
            >
               <div className="login-heading">Sign Up</div>
                <Form.Item
                rules={[{ required: true, message: 'Please enter your username!' }]}
                className="login-label signUp-label"
                name="username"
                >
                    <Input name="username" 
                    placeholder="Enter your username"
                    type="text"
                    value={signUpUser.username}
                    onChange={changeHandler}
                    className="input-field signUp-field"
                    />
                </Form.Item>

                <Form.Item
                rules={[{ required: true, message: 'Please enter your email!' }]}
                className="login-label signUp-label"
                name="email"
                >
                <Input name="email" 
                    placeholder="Enter your email"
                    type="email"
                    value={signUpUser.email}
                    onChange={changeHandler}
                    className="input-field signUp-field"
                    />
                </Form.Item>
                
                <Form.Item
              name="password"
              rules={[
                { required: true, message: "Password can't be an empty field" },
              ]}
              className="password-field formLabel login-label signUp-label"
            >
              <Input.Password
                name="password"
                placeholder="Your Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="password-input input-field"
                value={signUpUser.password}
                onChange={changeHandler}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              className="password-field formLabel login-label"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                name="confirmPassword"
                value={signUpUser.confirmPassword}
                className="password-input input-field"
                onChange={changeHandler}
              />
            </Form.Item>

          <Form.Item
          className="date-label"
          style={{margin: "15px 0 20px 0",}}>
            <DatePicker onChange={handleDateChange}
            className="date-picker"
            style={{width: "100%"}}/>
          </Form.Item>

          <Form.Item 
          className="gender-label">
            <Select
            onChange={handleGenderChange}
            className="gender-select"
            placeholder="Female"
            style={{textAlign:"start"}}
            >
                <Option value="female">Female</Option>
                <Option value="male">Male</Option>
                <Option value="non-binary">Non-binary</Option>
                <Option value="intersex">Intersex</Option>
                <Option value="other">Other</Option>
            </Select>

          </Form.Item>

          { /*<Form.Item className="">
              <TextArea rows={4} 
              name="bio"
              value={signUpUser.bio}
              onChange={changeHandler}
              />
              </Form.Item> */}

          <Form.Item className="button-label" style={{marginBottom: "13px"}}>
            <Button type="primary" htmlType="submit" key="submit" onClick={finishHandler}
            className="login-button">
              Create Account
            </Button>
            </Form.Item>
            <p>Already have an account? <Link to="/login"><span>Sign in</span></Link></p>
          </Form>
          
        </div>

        </div>
    )
}

export default SignUp