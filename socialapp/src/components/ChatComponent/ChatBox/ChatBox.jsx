import React from 'react'
import {Layout} from 'antd'

const ChatBox = () => {
    const {Content} = Layout
    return (
        <Layout >
            <Content>
                <div>Message box</div>
            </Content>
        </Layout>
    )
}

export default ChatBox