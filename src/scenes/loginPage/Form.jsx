import React from 'react';
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    firstName: yup.string()
        .required('Required'),
    lastName: yup.string()
        .required('Required'),
    email: yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: yup.string()
        .required('Required'),
    location: yup.string()
        .required('Required'),
    occupation: yup.string()
        .required('Required'),
    picture: yup.string()
        .required('Required'),
});

const loginSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: yup.string()
        .required('Required'),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [isLoginPage, setIsLoginPage] = useState(false);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobileScreen = useMediaQuery('(max-width: 600px)');

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        console.log(values)
        // for (let value in values) {
        //     formData.append(value, values[value]);
        // }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        console.log('dsada');
        if (isLoginPage) {
            // await login(values, onSubmitProps);
        } else {
            await register(values, onSubmitProps);
        }
    };   
    return (
        <Formik
            initialValues={isLoginPage ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLoginPage ? loginSchema : registerSchema}
            onSubmit={handleFormSubmit}
        >
            {
                ({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display='grid'
                            gap='30px'
                            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                            sx={{
                                '& > div': {
                                    gridColumn: isMobileScreen ? 'span 4' : undefined
                                }
                            }}
                        >
                            {!isLoginPage && (
                                <>
                                    <TextField
                                        label="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name="firstName"
                                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        label="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name="lastName"
                                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        sx={{ gridColumn: '3 / span 2' }}
                                    />
                                    <TextField
                                        label='Location'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location}
                                        name='location'
                                        error={Boolean(touched.location) && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                        sx={{ gridColumn: 'span 4' }}
                                    />
                                    <TextField
                                        label='Occupation'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.occupation}
                                        name='occupation'
                                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                        helperText={touched.occupation && errors.occupation}
                                        sx={{ gridColumn: 'span 4' }}
                                    />
                                    <Box
                                        gridColumn="span 4"
                                        border={`1px solid ${palette.neutral.medium}`}
                                        borderRadius="5px"
                                        p="1rem"
                                        >
                                        <Dropzone
                                            acceptedFiles=".jpg,.jpeg,.png"
                                            multiple={false}
                                            onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                            }
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                <p>Add Picture Here</p>
                                                ) : (
                                                <FlexBetween>
                                                    <Typography>{values.picture.name}</Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                                )}
                                            </Box>
                                            )}
                                        </Dropzone>
                                        </Box>
                                </>
                            )}

                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <Box>
                                <Button
                                    fullWidth
                                    type='submit'
                                    sx={{
                                        m: '2rem 0',
                                        p: '1rem 0',
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        '&:hover': { backgroundColor: palette.primary.dark },
                                    }}
                                >
                                    {isLoginPage ? 'LOG IN' : 'REGISTER'}
                                </Button>
                                <Typography
                                    onClick={() => {
                                        setIsLoginPage(!isLoginPage);
                                        resetForm();
                                    }}
                                    sx={{
                                        textDecoration: 'underline',
                                        color: palette.primary.main,
                                        "&:hover": {
                                        cursor: "pointer",
                                        color: palette.primary.light,
                                        },
                                    }}
                                >
                                    {isLoginPage
                                    ? 'Don\'t have an account? Sign up here.' 
                                    : 'Already have an account? Login here.'
                                    }
                                </Typography>
                            </Box>
                        </Box>
                    </form>
                )
            }
        </Formik>
    );
};

export default Form;