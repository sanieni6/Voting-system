"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useForm} from "react-hook-form";


const LoginForm = () => {
    const {register, handleSubmit} = useForm();

    const [emailError, setEmailError] = React.useState("");

    const [passwordError, setPasswordError] = React.useState("");


    const handleFormSubmit = (formData) => {
        console.log(formData);
        if (!formData.email || !formData.email.length) {
            setEmailError("email is required");
            return false;
        } else {
            setEmailError("");
        }
        if (!formData.password || !formData.password.length) {
            setPasswordError("Password is required");
            return false;
        } else {
            setPasswordError("");
        }

        return true;
    }
    return (
<Container component="main" maxWidth="xs">
    <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <Typography component="h1" variant="h5">
            Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        error={!!(emailError && emailError.length)}
                        helperText={emailError}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        {...register('email')}
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!!(passwordError && passwordError.length)}
                        helperText={passwordError}
                        required
                        fullWidth
                        {...register('password')}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className={'bg-blue-500'}
            >
                Login
            </Button>
        </Box>
    </Box>
</Container>

    );
}

export default LoginForm