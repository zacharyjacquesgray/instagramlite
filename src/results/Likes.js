import React from 'react';

const Likes = ({ likes }) => {
    let likeCommas = '';
    // Add commas to represent thousands.
    if (likes) {
        likeCommas = likes !== '0' ? likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';
    }

    return <h4 className='like-h4'>{likeCommas} likes</h4>;
}

export default Likes;
