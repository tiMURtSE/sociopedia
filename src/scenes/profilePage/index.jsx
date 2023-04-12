import { Box, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from 'scenes/navbar';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import UserWidget from 'scenes/widgets/UserWidget';

const ProfilePage = () => {
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const [user, setUser] = useState({});

    const isMobileScreen = useMediaQuery('(max-width: 1000px)');
    
    const getUser = async () => {
        const url = `http://localhost:3001/users/${userId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });

        const user = await response.json();

        setUser(user);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Navbar />

            <Box
                display={'flex'}
                flexDirection={isMobileScreen ? 'column' : 'row'}
                justifyContent='center'
                gap='2rem'
                padding='2rem 6%'
            >
                <Box 
                    flexBasis={isMobileScreen ? undefined : '26%'}
                    display='flex'
                    flexDirection='column'
                    gap='2rem'
                >
                    <UserWidget userId={userId} />

                    <FriendListWidget userId={userId} />
                </Box>

                <Box 
                    flexBasis={isMobileScreen ? undefined : '42%'}
                    display='flex'
                    flexDirection='column'
                    gap='2rem'
                >
                    <MyPostWidget userId={userId} picturePath={user.picturePath} />

                    <PostsWidget userId={userId} isProfile={true} />
                </Box>
            </Box>
        </>
    );
};

export default ProfilePage;