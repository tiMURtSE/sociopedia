import { Box, IconButton, Typography, useTheme } from '@mui/material';
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserImage from 'components/UserImage';
import { useNavigate } from 'react-router-dom';

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();

    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

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

    if (!user) return null;

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper
            width={400}
        >
            <FlexBetween
                gap='0.5rem'
                pb={'1.1rem'}
                onClick={() => navigate('/profile/2')}
            >
                <FlexBetween gap='1rem'>
                    <UserImage image={picturePath}/>

                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>

                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>

                <ManageAccountsOutlined />
            </FlexBetween>


        </WidgetWrapper>
    );
};

export default UserWidget;