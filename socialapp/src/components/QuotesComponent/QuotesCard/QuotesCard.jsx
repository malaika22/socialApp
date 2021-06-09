import React, { useContext, useState } from 'react'
import './styles.scss'
import {ShareAltOutlined, CheckOutlined} from '@ant-design/icons'
import Icon from '@ant-design/icons';
import { PostsContext } from '../../../contexts/PostsContext'
import { QuotesContext } from '../../../contexts/QuotesContex'


const QuotationIcon = () =>{
    return(
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" class="svg-inline--fa fa-quote-left fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>
    )
}
const QuotesCard = ({quote}) =>{
       const {author, content, tags, id} = quote
       const {createPost} = useContext(PostsContext)
       const {changeShareStatus} = useContext(QuotesContext)
       const [shareAction, setSharedAction] = useState('') 

       const sharePost = () =>{
           changeShareStatus(quote)
           createPost(content)
       }
    return(
        <div className="quote-card-container">
                <div className="quote-content">
                    <div  className="quote-box">
                        <div className="quote">
                            <Icon component={QuotationIcon} className="quote-icon"/>
                            <div className="quote-content">
                               {content}
                            </div>
                            <Icon component={QuotationIcon} rotate={180} className="quote-icon"/>
                        </div>

                        <div className="quote-author">
                           <span>-</span>  {author}
                        </div>
                    </div>
                    {quote.shareStatus === 'shared' ?
                        <div className="share-div">
                        <CheckOutlined className="share-icon"/> 
                        <span className="share-span" >Shared</span>
                        </div>
                   : 
                        <div className="share-div" onClick={sharePost}>
                        <ShareAltOutlined className="share-icon"/> 
                            <span className="share-span" >Share</span>
                        </div>   
                    }
                    <div className="tags-container">
                        <div className="tags-div">
                                <span className="tag-title">tags :</span>
                            {(tags || []).map(tag => {
                                return(
                                    <span className="quote-tag">
                                        {tag}
                                    </span>
                                )
                            })}
                        </div>

                    </div>
                </div>
        </div>
    )
}

export default QuotesCard