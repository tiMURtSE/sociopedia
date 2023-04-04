import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import UserWidget from 'scenes/widgets/UserWidget';

const HomePage = () => {
    const { _id, picturePath } = useSelector((state) => state.user);
    const isMobileScreen = useMediaQuery('(max-width: 1000px)');

    return (
        <div>
            <Navbar />

            <Box
                display={isMobileScreen ? 'block' : 'flex'}
                justifyContent='space-between'
                padding='2rem 6%'
            >
                <Box flexBasis={isMobileScreen ? undefined : '26%'}>
                    <UserWidget userId={_id} picturePath={picturePath}/>
                </Box>

                <Box flexBasis={isMobileScreen ? undefined : '42%'}>
                    <MyPostWidget picturePath={picturePath} />
                </Box>
            </Box>
        </div>
    );
};

export default HomePage;