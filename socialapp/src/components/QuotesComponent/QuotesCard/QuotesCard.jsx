import React from 'react'
import './styles.scss'
import {ShareAltOutlined} from '@ant-design/icons'


const QuotesCard = ({quote}) =>{
       const {author, content, tags, id} = quote
       console.log('author', author)
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
                    <div className="share-div">
                        <ShareAltOutlined className="share-icon"/> <span className="share-span">Share</span>
                    </div>
                </div>
        </div>
    )
}

export default QuotesCard