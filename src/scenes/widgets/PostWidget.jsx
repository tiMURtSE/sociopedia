import React from 'react';

const PostWidget = ({ post }) => {
    return (
        <div>
            {post.description}
        </div>
    );
};

export default PostWidget;