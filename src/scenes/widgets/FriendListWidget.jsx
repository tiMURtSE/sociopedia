import React from 'react';
import { useSelector } from 'react-redux';

const FriendListWidget = () => {
    const friends = useSelector((state) => state.user.friends);
    return (
        <></>
    );
};

export default FriendListWidget;