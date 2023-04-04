import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
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

            <Divider />

            <Box p={'1rem 0'}>
                <Box display='flex' alignItems='center' gap={'1rem'} mb={'0.5rem'}>
                    <LocationOnOutlined fontSize='large' sx={{color: main}} />

                    <Typography color={medium}>{location}</Typography>
                </Box>

                <Box display='flex' alignItems='center' gap={'1rem'}>
                    <WorkOutlineOutlined fontSize='large' sx={{color: main}} />

                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>

            <Divider />

            <Box p='1rem 0'>
                <FlexBetween mb='0.5rem'>
                    <Typography color={medium}>Who's viewed your profile</Typography>

                    <Typography color={main} fontWeight='500'>{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Impressions of your post</Typography>

                    <Typography color={main} fontWeight='500'>{impressions}</Typography>
                </FlexBetween>
            </Box>

            <Divider />

            <Box p='1rem 0'>
                <Typography fontSize='1rem' fontWeight='500' color={main} mb='1rem'>Social Profiles</Typography>

                <FlexBetween gap='1rem' mb='0.5rem'>
                    <FlexBetween gap='1rem'>
                        <img src="../assets/twitter.png" alt="twitter logo" />

                        <Box>
                            <Typography color={main} fontWeight='500'>Twitter</Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>

                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        
                        <Box>
                            <Typography color={main} fontWeight="500">Linkedin</Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>

                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default UserWidget;