import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({friendId, name, location, userPicturePath }) => {
    const userId = useSelector((state) => state.user._id);
    const friends = useSelector((state) => state.user.friends);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const isFriend = friends.find((friend) => friend === friendId);
    const isLoggedInUser = (friendId === userId) ? true : false;

    const addFriend = async () => {
        const url = `http://localhost:3001/users/${userId}/${friendId}/add_friend`;
       
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const friends = await response.json();

        dispatch(setFriends({ friends }));
    };

    const removeFriend = async () => {
        const url = `http://localhost:3001/users/${userId}/${friendId}/remove_friend`;

        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const friends = await response.json();

        dispatch(setFriends({ friends }));
    };

    return (
        <FlexBetween>
            <FlexBetween gap='1rem'>
                <UserImage image={userPicturePath} size="55px" />

                <Box onClick={() => {
                    navigate(`/profile/${friendId}`);
                    navigate(0);
                }}>
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                          "&:hover": {
                            color: palette.primary.dark,
                            cursor: "pointer",
                          },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize='0.75rem'>
                        {location}
                    </Typography>
                </Box>
            </FlexBetween>

            <IconButton 
                onClick={isFriend ? removeFriend : addFriend}
            >
                {!isLoggedInUser && (
                    isFriend ? (
                        <PersonRemoveOutlined sx={{ color: primaryDark }} />
                    ) : (
                        <PersonAddOutlined sx={{ color: primaryDark }} />
                    )
                )}
            </IconButton>
        </FlexBetween>
    );
};

export default Friend;