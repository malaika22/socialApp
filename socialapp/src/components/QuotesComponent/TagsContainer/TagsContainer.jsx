import { filter } from 'lodash'
import React from 'react'


const TagsContainer = ({handleTagClick}) => {
    const tags = ["friendship", "wisdom", "famous-quotes", "technology", "inspirational", "life"]

    console.log('container tag', tags)
    const clickTagHandle = (tag) =>{
        console.log("in click tag")
        handleTagClick(tag)
    }
    return(
        <div className="tags-main-container">
           {tags.map(tag =>  <div onClick={()=>clickTagHandle(tag)}>{tag}</div>)}
        </div>
    )
}

export default TagsContainer