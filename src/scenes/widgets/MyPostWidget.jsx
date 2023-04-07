import { 
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';
import React, { useState } from 'react';
import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import Dropzone from 'react-dropzone';

const MyPostWidget = ({ userId, picturePath }) => {
    const [post, setPost] = useState('');
    const [image, setImage] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const isMobileScreen = useMediaQuery('(max-width: 1000px)');

    const { palette } = useTheme();
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const url = 'http://localhost:3001/posts/';
        const formData = new FormData();

        formData.append('userId', userId);
        formData.append('description', post);
        if (image) {
            formData.append('picture', image);
            formData.append('picturePath', image.name);
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`}, 
            body: formData,
        });

        const posts = await response.json();

        dispatch(setPosts({ posts }));
        setImage(null);
        setIsImage(false)
        setPost('');
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap='1.5rem'>
                <UserImage image={picturePath}/>

                <InputBase
                    value={post}
                    onChange={(event) => setPost(event.target.value)}
                    sx={{
                        width: '100%',
                        padding: '1rem 2rem',
                        backgroundColor: palette.neutral.light,
                        borderRadius: '2rem',
                    }}
                    placeholder="What's on your mind?"
                />
            </FlexBetween>

            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    width='100%'
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />

                                    {!image ? (
                                            <p>Add Picture Here</p>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{image.name}</Typography>

                                                <EditOutlined />
                                            </FlexBetween>
                                    )}
                                </Box>

                                <IconButton 
                                    onClick={() => setImage(null)}
                                    sx={{ width: "15%" }}
                                >
                                    <DeleteOutlined />
                                </IconButton>
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
                )}

            <Divider sx={{ margin: '1.25rem 0'}}/>

            <FlexBetween>
                <FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)}>
                        <ImageOutlined sx={{ color: mediumMain }} />

                        <Typography
                            color={mediumMain}
                            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                        >
                            Image
                        </Typography>
                </FlexBetween>

                {isMobileScreen ? (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                ) : (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                )}

                <Button 
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                      color: palette.background.alt,
                      backgroundColor: palette.primary.main,
                      borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;