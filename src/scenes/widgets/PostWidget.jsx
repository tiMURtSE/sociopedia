import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, Divider, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Friend from "components/Friend";
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({ post }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const [isComments, setIsComments] = useState(false);
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

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
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

            <Typography
                color={main}
                sx={{ mt: '1rem' }}
            >{description}</Typography>

            {picturePath && (
                <img 
                width='100%' 
                height='auto' 
                style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
                src={`http://localhost:3001/assets/${picturePath}`} 
                alt='post image' />
            )}

            <FlexBetween mt='0.75rem'>
                <FlexBetween gap='1rem'>
                    <FlexBetween gap='0.25rem'>
                        <IconButton
                            onClick={patchLike}
                        >
                            {isPostLiked ? (
                                <FavoriteOutlined sx={{ color: primary }}/>
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>

                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap='0.25rem'>
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>

                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>

            {isComments && (
                <Box mt='0.5rem'>
                    {comments.map((comment, i) =>
                        <Box key={`${firstName}${lastName}-${i}`}>
                            <Divider />

                            <Typography sx={{ color: main, m: '0.5rem', pl: '1rem' }}>
                                {comment}
                            </Typography>
                        </Box>    
                    )}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;