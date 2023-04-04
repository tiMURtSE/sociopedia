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

const MyPostWidget = ({ _id, picturePath }) => {
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

        formData.append('userId', _id);
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

        const posts = response.json();

        dispatch(setPosts({ posts }));
        setImage(null);
        setPost('');
    };

    return (
        <WidgetWrapper>
            <FlexBetween mb='1rem' gap='1.5rem'>
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
                )}

            <Divider />

            <FlexBetween mt='1rem'>
                <FlexBetween gap='0.5rem'>
                    <IconButton onClick={() => setIsImage(!isImage)}>
                        <ImageOutlined />
                    </IconButton>
                    Image
                </FlexBetween>

                <FlexBetween gap='0.5rem'>
                    <GifBoxOutlined />
                    Clip
                </FlexBetween>

                <FlexBetween gap='0.5rem'>
                    <AttachFileOutlined />
                    Attachment
                </FlexBetween>

                <FlexBetween gap='0.5rem'>
                    <MicOutlined />
                    Audio
                </FlexBetween>

                <Button sx={{ backgroundColor: medium }}>
                    <Typography>Post</Typography>
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;