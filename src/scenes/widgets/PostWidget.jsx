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
    // mojno bez useState
    const [likesState, setLikesState] = useState(likes);

    const likePost = async () => {
        const postId = _id;
        const url = `http://localhost:3001/posts/${postId}/like`;

        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postUserId }),
        });

        const updatedPost = await response.json();

        dispatch(setPost({ post: updatedPost }));
        setLikesState(updatedPost.likes);
    };

    return (
        <WidgetWrapper>
            {/* PFP, NAME, ADD FRIEND BUTTON */}
            <Friend
                friendId={postUserId}
                name={`${firstName} ${lastName}`}
                location={location}
                userPicturePath={userPicturePath}
            />

            {/* DESCRIPTION */}
            <Typography>{description}</Typography>

            {(picturePath) && (
                <img 
                width='100%' 
                height='auto' 
                src={`http://localhost:3001/assets/${picturePath}`} 
                alt='post image' />
            )}

            {/* LIKES, COMMENTS, SHARE ROW */}
            <FlexBetween>
                <FlexBetween>
                    <FlexBetween>
                        <IconButton
                            onClick={likePost}
                        >
                            <FavoriteOutlined />
                        </IconButton>

                        <Typography>{Object.keys(likesState).length}</Typography>
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