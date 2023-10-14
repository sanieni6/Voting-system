"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useForm} from "react-hook-form";
import { useVotingSystemStore } from '@/store/store';
import { useRouter } from 'next/navigation'


const LoginForm = () => {

    //setting login
    const router = useRouter();
    const {login, currentUser, isLoggedIn} = useVotingSystemStore();
    console.log(currentUser);
    const {register, handleSubmit} = useForm();

    const [usernameError, setUsernameError] = React.useState("");

    const [passwordError, setPasswordError] = React.useState("");


    const handleFormSubmit = (formData) => {
        console.log(formData);
        login(formData.username, formData.password);
        if (!formData.username || !formData.username.length) {
            setUsernameError("username is required");
            return false;
        } else {
            setUsernameError("");
        }
        if (!formData.password || !formData.password.length) {
            setPasswordError("Password is required");
            return false;
        } else {
            setPasswordError("");
        }

        return true;
    }

    React.useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    },);

    return (
        <div className=' h-screen'>
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
                        error={!!(usernameError && usernameError.length)}
                        helperText={usernameError}
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        {...register('username')}
                        autoComplete="username"
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
</div>
    );
}

export default LoginForm