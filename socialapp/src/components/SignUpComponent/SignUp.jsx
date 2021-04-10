import React, { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {Form, Input} from 'antd'
import './styles.scss'

const SignUp = () =>{

    const [signUpUser, setSignUpUser] = useState({
        username: '',
        uid: '',
        email: ''
    })
    const finishHandler = () =>{
        if(signUpUser.email && signUpUser.username){

        }
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
                    type="text"/>
                </Form.Item>

                <Form.Item
                label="Email"
                rules={[{ required: true, message: 'Please enter your email!' }]}
                >
                <Input name="email" 
                    placeholder="Enter your email"
                    type="email"
                    
                    />
                </Form.Item>
                
                <Form.Item
              name="password"
              rules={[
                { required: true, message: "Password can't be an empty field" },
              ]}
              className="password-field formLabel"
            >
              <Input.Password
                placeholder="Your Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="password-input input-field"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
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
                className="password-input input-field"
              />
            </Form.Item>

            </Form>
        </div>
    )
}

export default SignUp