import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false }) => {
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
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []);

    return (
        <>
            {posts.map(post =>
                <PostWidget post={post} key={post._id}/>    
            )}
        </>
    );
};

export default PostsWidget;