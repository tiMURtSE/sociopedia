import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
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
        userId,
        firstName,
        lastName,
        picturePath,
        description,
        location,
        userPicturePath,
        comments,
        likes,
    } = post;
    const [likesState, setLikesState] = useState(likes);

    const likePost = async () => {
        const postId = _id;
        const url = `http://localhost:3001/posts/${postId}/like`;
        console.log({userId})
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userId }),
        });

        const updatedPost = await response.json();

        dispatch(setPost({ post: updatedPost }));
        console.log(updatedPost)
        setLikesState(updatedPost.likes);
    };

    return (
        <WidgetWrapper>
            {/* PFP, NAME, ADD FRIEND BUTTON */}
            <FlexBetween>
                <FlexBetween
                    gap='1rem'
                >
                    <UserImage image={userPicturePath}/>

                    <Box>
                        <Typography
                            fontWeight='500'
                        >
                            {firstName} {lastName}
                        </Typography>

                        <Typography>{location}</Typography>
                    </Box>
                </FlexBetween>


            </FlexBetween>

            {/* DESCRIPTION */}
            <Typography>{description}</Typography>

            <image width='100%' height='auto' src={`http://localhost:3001/assets/${picturePath}`} />

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