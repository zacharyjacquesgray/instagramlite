import React from 'react';
import Likes from './Likes';

const ResultsFooter = ({ userHeader, caption, likes }) => {

    return (
    <div className="footer-rectangle">
        <span className="user-caption-container">
            <p className="post-caption"><b>{userHeader}</b> {caption}</p>
        </span>
        <div className="likes-caption">
            <Likes likes={likes}/>
        </div>
    </div>
    )
}

export default ResultsFooter;