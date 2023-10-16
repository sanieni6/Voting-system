"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useVotingSystemStore } from "@/store/store";
import { useRouter } from "next/navigation";
import SnackbarFeedback from "./SnackbarFeedback";

const LoginForm = () => {
  //setting login
    const router = useRouter();
  React.useEffect(() => {
    useVotingSystemStore.persist.rehydrate();
  }, []);
  const { login, isLoggedIn } = useVotingSystemStore();
  const [error, setError] = React.useState('');
  //console.log(currentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (formData) => {
    const message = await login(formData.username, formData.password);
    message ? setError(message) : setError('Invalid email or password');
    
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <div className=" h-screen">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="email"
                  {...register("username")}
                  autoComplete="username"
                />
                {errors.username && (
                  <span className="text-red-500">This field is required</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("password")}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={"bg-blue-500"}
            >
              Login
            </Button>
          </Box>
        </Box>
        {
          error!='' &&  <SnackbarFeedback openStatus={true} message={error} /> 
        }
        
      </Container>
    </div>
  );
};

export default LoginForm;
