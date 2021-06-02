import { filter } from 'lodash'
import React from 'react'


const TagsContainer = ({tags, handleTagClick}) => {
  
   const  renderFilteredQuotes = (tag) =>{
        handleTagClick(tag)
}

    console.log('container tag', tags)
    return(
        <div className="tags-main-container">
            {tags.map(tag => {
                return <div onClick={()=>renderFilteredQuotes(tag)}> {tag.name} </div>
            })}
        </div>
    )
}

export default TagsContainer