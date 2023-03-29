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
    const [isLoginPage, setIsLoginPage] = useState(true);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobileScreen = useMediaQuery('(max-width: 600px)');

    return (
        <Formik
            initialValues={isLoginPage ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLoginPage ? loginSchema : registerSchema}
        >
            
        </Formik>
    );
};

export default Form;