/* "use client"

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


const SignUpForm = () => {
    const {register, handleSubmit} = useForm();

    const [fNameError, setFNameError] = React.useState("");

    const [lNameError, setLNameError] = React.useState("");

    const [emailError, setEmailError] = React.useState("");

    const [passwordError, setPasswordError] = React.useState("");


    const handleFormSubmit = (formData) => {
        console.log(formData);
        if (!formData.firstName || !formData.firstName.length) {
            setFNameError("First name is required");
            return false;
        } else {
            setFNameError("");
        }
        if (!formData.lastName || !formData.lastName.length) {
            setLNameError("Last name is required");
            return false;
        } else {
            setLNameError("");
        }
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
            Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={!!(fNameError && fNameError.length)}
                        autoComplete="given-name"
                        helperText={fNameError}
                        {...register('firstName')}
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={!!(lNameError && lNameError.length)}
                        helperText={lNameError}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        {...register('lastName')}
                        autoComplete="family-name"
                    />
                </Grid>
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
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
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
                Sign Up
            </Button>
        </Box>
    </Box>
</Container>

    );
}

export default SignUpForm */