import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import PostWidget from './PostWidget';
import { Box } from '@mui/material';

const PostsWidget = ({ userId, isProfile = false }) => {
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    console.log(posts)
    const getPosts = async () => {
        const url = isProfile 
            ? `http://localhost:3001/posts/${userId}/posts`
            : 'http://localhost:3001/posts/';

        const response = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`}
        });

        const posts = await response.json();

        dispatch(setPosts({ posts }));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <Box
            display='flex'
            flexDirection='column'
            gap='2rem'
        >   
            {posts.map(post => 
                <PostWidget post={post} key={post._id}/>
            )}
        </Box>
    );
};

export default PostsWidget;