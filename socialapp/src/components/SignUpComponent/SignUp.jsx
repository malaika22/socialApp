import React, { useState, useContext } from 'react'
import firebase from '../../fbConfig'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {Form, Input, Button, DatePicker, Select} from 'antd'
import {Redirect, useHistory} from 'react-router-dom'
import {UserContext} from '../../contexts/UserContext'
import './styles.scss'

const SignUp = () =>{
    const [signUpUser, setSignUpUser] = useState({
        username: '',
        uid: '',
        email: '',
        bio: '',
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
          db.collection('users').add({
            uid: res.uid,
            username: signUpUser.username,
            email: signUpUser.email,
            bio: signUpUser.bio,
            dateOfBirth: signUpUser.dateOfBirth,
            gender: signUpUser.gender
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
        if(signUpUser.email && signUpUser.username){
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
    if(currentUser) {
      console.log("currentUser in signup")
      return <Redirect to="/" />
    }
    return(
        <div>
            <Form
            name="signUp-form"
            finish={finishHandler}
            >
                <Form.Item
                label="Username"
                rules={[{ required: true, message: 'Please enter your username!' }]}
                >
                    <Input name="username" 
                    placeholder="Enter your username"
                    type="text"
                    value={signUpUser.username}
                    onChange={changeHandler}
                    />
                </Form.Item>

                <Form.Item
                label="Email"
                rules={[{ required: true, message: 'Please enter your email!' }]}
                >
                <Input name="email" 
                    placeholder="Enter your email"
                    type="email"
                    value={signUpUser.email}
                    onChange={changeHandler}
                    />
                </Form.Item>
                
                <Form.Item
              name="password"
              rules={[
                { required: true, message: "Password can't be an empty field" },
              ]}
              className="password-field formLabel"
              label="Password"
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
              label="Confirm password"
              className="password-field formLabel"
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
          label="Date of Birth">
            <DatePicker onChange={handleDateChange}/>
          </Form.Item>

          <Form.Item>
            <Select
            onChange={handleGenderChange}
            >
                <Option value="female">Female</Option>
                <Option value="male">Male</Option>
                <Option value="non-binary">Non-binary</Option>
                <Option value="intersex">Intersex</Option>
                <Option value="other">Other</Option>
            </Select>

          </Form.Item>

          <Form.Item>
              <TextArea rows={4} 
              name="bio"
              value={signUpUser.bio}
              onChange={changeHandler}
              />
          </Form.Item> 

          <Form.Item>
            <Button type="primary" htmlType="submit" key="submit" onClick={finishHandler}>
              Submit
            </Button>
          </Form.Item>


            </Form>
        </div>
    )
}

export default SignUp