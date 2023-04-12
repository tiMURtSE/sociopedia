import { Box, Typography, useTheme } from '@mui/material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'state';

const FriendListWidget = ({ userId }) => {
    // const friends = useSelector((state) => state.user.friends);
    const [friends, setFriends] = useState([]);
    
    const token = useSelector((state) => state.token);
    // const dispatch = useDispatch();

    const { palette } = useTheme();
    
    const getFriends = async () => {
        const url = `http://localhost:3001/users/${userId}/friends`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });

        const friends = await response.json();

        setFriends(friends);
        // dispatch(setFriends({ friends }));
    };

    useEffect(() => {
        getFriends();
    }, []);
    
    return (
        <WidgetWrapper>
            <Typography 
                color={palette.neutral.dark}
                variant='h5'
                fontWeight='500'
                sx={{ mb: '1.5rem' }}
            >
                Friend List
            </Typography>

            <Box display='flex' flexDirection='column' gap='0.5rem' mt='0.5rem'>
                {friends.map(friend =>
                    <Friend friendId={friend._id} 
                        name={`${friend.firstName} ${friend.lastName}`} 
                        location={friend.location} 
                        userPicturePath={friend.picturePath} 
                        key={friend._id}
                    />
                )}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;