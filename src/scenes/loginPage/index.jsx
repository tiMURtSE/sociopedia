import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Form from './Form';

const LoginPage = () => {
    const theme = useTheme();
    const isMobileScreen = useMediaQuery('(max-width: 1000px)');
    const altColor = theme.palette.background.alt;

    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={altColor}
                p="1rem 6%"
                textAlign="center"
            >
                <Typography fontWeight="bold" fontSize="32px" color="primary" sx={{cursor: 'default'}}>
                    Sociopedia
                </Typography>
            </Box>

            <Box 
                width={isMobileScreen ? '93%' : '50%'}
                m='2rem auto'
                p='2rem'
                borderRadius='1.5rem'
                backgroundColor={altColor}
            >
                <Typography>
                    Welcome to Socipedia, the Social Media for Sociopaths!
                </Typography>
                <Form />
            </Box>
        </Box>
    );
};

export default LoginPage;