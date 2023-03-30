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
    const [isLoginPage, setIsLoginPage] = useState(false    );
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobileScreen = useMediaQuery('(max-width: 600px)');

    const handleFormSubmit = async (values, onSubmitProps) => {};   
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
                            {isLoginPage ? (
                                <div></div>
                            ) : (
                                <>
                                    <TextField
                                        label='First Name'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name='firstName'
                                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                    <TextField
                                        label='Last Name'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name='lastName'
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
                                </>
                            )}
                        </Box>
                    </form>
                )
            }
        </Formik>
    );
};

export default Form;