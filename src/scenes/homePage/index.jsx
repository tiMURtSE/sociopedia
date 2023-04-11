import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import UserWidget from 'scenes/widgets/UserWidget';

const HomePage = () => {
    const { _id, picturePath } = useSelector((state) => state.user);
    const isMobileScreen = useMediaQuery('(max-width: 1000px)');

    return (
        <div>
            <Navbar />

            <Box
                display={'flex'}
                flexDirection={isMobileScreen ? 'column' : 'row'}
                justifyContent='space-between'
                gap={isMobileScreen ? '2rem' : '0.5rem'}
                padding='2rem 6%'
            >
                <Box flexBasis={isMobileScreen ? undefined : '26%'}>
                    <UserWidget userId={_id} picturePath={picturePath}/>
                </Box>

                <Box flexBasis={isMobileScreen ? undefined : '42%'}>
                    <MyPostWidget userId={_id} picturePath={picturePath} />

                    <PostsWidget userId={_id} isProfile={false}/>
                </Box>

                <Box flexBasis={isMobileScreen ? undefined : '26%'}>
                    <FriendListWidget userId={_id} />
                </Box>
            </Box>
        </div>
    );
};

export default HomePage;