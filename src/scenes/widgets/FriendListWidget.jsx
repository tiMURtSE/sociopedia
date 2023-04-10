import { Box, Typography } from '@mui/material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import React from 'react';
import { useSelector } from 'react-redux';

const FriendListWidget = () => {
    const friends = useSelector((state) => state.user.friends);
    return (
        <WidgetWrapper>
            <Typography>Friend List</Typography>

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