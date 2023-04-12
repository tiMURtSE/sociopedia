import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import PostWidget from './PostWidget';
import { Box } from '@mui/material';

const PostsWidget = ({ userId, isProfile = false }) => {
    const [isProfilePostsLoading, setIsProfilePostsLoading] = useState(isProfile);
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const getPosts = async () => {
        const url = 'http://localhost:3001/posts';

        const response = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`}
        });

        const posts = await response.json();

        dispatch(setPosts({ posts }));
    };

    const getUserPosts = async () => {
        const url = `http://localhost:3001/posts/${userId}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });

        const posts = await response.json();

        dispatch(setPosts({ posts }));
        setIsProfilePostsLoading(false);
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []);

    if (isProfilePostsLoading) return null;
    
    return (
        <Box display='flex' flexDirection='column' gap='1rem'>
            {[...posts]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map(post =>
                <PostWidget post={post} key={post._id}/>    
            )}
        </Box>
    );
};

export default PostsWidget;