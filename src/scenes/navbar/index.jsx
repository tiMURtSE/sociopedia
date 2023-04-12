import React, { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { mobileMediaQuery } from 'utils/consts';

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isMobileScreen = useMediaQuery(mobileMediaQuery);

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryDark = theme.palette.primary.dark;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <FlexBetween padding='1rem 6%' backgroundColor={alt}>
            <FlexBetween gap={1.75}>
                <Typography
                    fontWeight='bold'
                    fontSize='clamp(1rem, 2rem, 2.25rem)'
                    color='primary'
                    onClick={() => navigate('/home')}
                    sx={{
                        '&:hover': {
                            color: primaryDark,
                            cursor: 'pointer',
                        },
                    }}
                >
                    Sociopedia
                </Typography>

                {!isMobileScreen && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius='9px'
                        gap='3rem'
                        padding='0.2rem 1.5rem 0.1rem'
                    >
                        <InputBase placeholder='Search...'/>
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {isMobileScreen ? (
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu sx={{ fontSize: '25px' }} />
                </IconButton>
            ) : (
                <FlexBetween gap='2rem'>
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === 'dark' ? (
                        <LightMode sx={{ fontSize: '25px'}} />
                    ) : (
                        <DarkMode sx={{ color: dark, fontSize: '25px'}} />
                    )}
                </IconButton>

                <Message sx={{ fontSize: '25px' }} />
                <Notifications sx={{ fontSize: '25px' }} />
                <Help sx={{ fontSize: '25px' }} />
                <FormControl variant='standard' value={fullName}>
                    <Select 
                        value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem",
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight,
                            },
                        }}
                        input={<InputBase />}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>
            )}

            {isMobileScreen && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                    boxShadow='4'
                >
                    <Box display='flex' justifyContent='flex-end' p='1rem'>
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close sx={{ fontSize: '25px' }} />
                        </IconButton>
                    </Box>

                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem"
                    >
                        <IconButton
                        onClick={() => dispatch(setMode())}
                        sx={{ fontSize: "25px" }}
                        >
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                        </IconButton>
                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem",
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight,
                            },
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>
                                Log Out
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;