import React, { useContext, useState } from 'react'
import './styles.scss'
import {ShareAltOutlined, CheckOutlined} from '@ant-design/icons'
import { PostsContext } from '../../../contexts/PostsContext'
import { QuotesContext } from '../../../contexts/QuotesContex'


const QuotesCard = ({quote}) =>{
       const {author, content, tags, id} = quote
       const {createPost} = useContext(PostsContext)
       const {changeShareStatus} = useContext(QuotesContext)
       const [shareAction, setSharedAction] = useState('') 
       console.log('author', author)

       const sharePost = () =>{
           changeShareStatus(quote)
           createPost(content)
       }
    return(
        <div className="quote-card-container">
                <div className="quote-content">
                    <div  className="quote-box">
                        <div className="quote-content">
                            {content}
                        </div>
                        <div className="quote-author">
                            {author}
                        </div>
                    </div>
                    <div className="tags-container">
                        {(tags || []).map(tag => {
                            return(
                                <span className="quote-tag">
                                    {tag}
                                </span>
                            )
                        })}
                    </div>
                    {quote.shareStatus === 'shared' ?
                        <div className="share-div">
                        <CheckOutlined /> 
                        <span className="share-span" >Shared</span>
                        </div>
                   : 
                        <div className="share-div" onClick={sharePost}>
                        <ShareAltOutlined className="share-icon"/> 
                            <span className="share-span" >Share</span>
                        </div>   
                    }
                </div>
        </div>
    )
}

export default QuotesCard