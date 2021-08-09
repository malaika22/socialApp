import React from 'react';
import './styles.scss';


const TagsContainer = ({handleTagClick}) => {
    const tags = ["friendship", "wisdom", "famous-quotes", "technology", "inspirational", "life"]

    console.log('container tag', tags)
    const clickTagHandle = (tag) =>{
        console.log("in click tag")
        handleTagClick(tag)
    }
    return(
        <div className="tags-main-div">
            <div className="tags-header">Browse by tags</div>
            <div className="tags-div">
                {tags.map(tag =>  <div onClick={()=>clickTagHandle(tag)} className="tags">{tag}</div>)}
            </div>
 
        </div>
    )
}

export default TagsContainer