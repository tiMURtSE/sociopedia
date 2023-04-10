import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, Divider, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Friend from "components/Friend";
import UserImage from "components/UserImage";
import WidgetWrapper from 'components/WidgetWrapper';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({ post }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const {
        _id,
        userId: postUserId,
        firstName,
        lastName,
        picturePath,
        description,
        location,
        userPicturePath,
        comments,
        likes,
    } = post;
    const isPostLiked = likes[userId];
    const likeCount = Object.keys(likes).length;

    const likePost = async () => {
        const postId = _id;
        const url = `http://localhost:3001/posts/${postId}/like`;

        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });

        const updatedPost = await response.json();

        dispatch(setPost({ post: updatedPost }));
    };

    return (
        <WidgetWrapper>
            <Friend
                friendId={postUserId}
                name={`${firstName} ${lastName}`}
                location={location}
                userPicturePath={userPicturePath}
            />

            <Typography>{description}</Typography>

            {(picturePath) && (
                <img 
                width='100%' 
                height='auto' 
                src={`http://localhost:3001/assets/${picturePath}`} 
                alt='post image' />
            )}

            <FlexBetween>
                <FlexBetween gap='1rem'>
                    <FlexBetween>
                        <IconButton
                            onClick={likePost}
                        >
                            {isPostLiked ? (
                                <FavoriteOutlined />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>

                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween>
                        <IconButton>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>

                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default PostWidget;