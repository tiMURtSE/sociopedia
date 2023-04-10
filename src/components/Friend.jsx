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
    const isFriend = friends.find((friend) => friend._id === friendId);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
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
            <FlexBetween>
                <UserImage image={userPicturePath} />

                <Box>
                    <Typography>{name}</Typography>
                    <Typography>{location}</Typography>
                </Box>
            </FlexBetween>

            <IconButton>
                
                {!isLoggedInUser && (
                    isFriend ? (
                        <PersonRemoveOutlined onClick={removeFriend} />
                    ) : (
                        <PersonAddOutlined onClick={addFriend} />
                    )
                )}
            </IconButton>
        </FlexBetween>
    );
};

export default Friend;