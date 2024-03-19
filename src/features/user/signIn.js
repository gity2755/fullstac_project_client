import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerInServer } from './userApi.js';
import { userIn } from './userSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { loginInServer } from './userApi.js';
const myTheme = createTheme(
  {
    palette: {
      primary: {
        main: '#11111',
      },
      secondary: pink,
    },
  },
);

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State variables
  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

  const onSubmit = async (data) => {
    try {
      const { userName, password, email } = data;
      const newUser = { userName, password, email };

      const credentials = { userName, password };
      try {
        setLoading(true);
        const responseRegister = await registerInServer(newUser);
        const responseLogin = await loginInServer(credentials);
        dispatch(userIn(responseLogin.data));
        setSuccessDialog(true);
        //Wait for 5 seconds before navigating to the home page
        setTimeout(() => {
          setSuccessDialog(false);
          navigate('/homePage');
        }, 5000);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Handle 400 status code (Bad Request)
          alert("Bad Request:", error.response.data.message);
        }
        if (error.response && error.response.status === 409) {
          // Handle 409 status code (conflict)
          alert("a user with same details is exist.");
          // Set an error state or display an error message to the user
        } else {
          // Handle other errors
          prompt("Unexpected Error  ", error.message);
        }
        return 0;
      } finally {
        setLoading(false);
      }
    } catch (error) {
      // Handle errors returned from the server
      if (error.response && error.response.data && error.response.data.message) {
        // Display the error message in an alert
        alert(error.response.data.message);
      } else {
        // Handle other errors
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialog(false);
    navigate('/homePage');
  };

  return (
    <ThemeProvider theme={myTheme}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={{ padding: 20, marginTop: 20, marginBottom: 30 }}>
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("userName", { required: "user name is required" })}
              label="userName"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={loading} // Disable the field when loading

            />
            <TextField
              {...register("password", { required: "Password is required" })}
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading} // Disable the field when loading

            />
            <TextField
              {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading} // Disable the field when loading

            />

            {/* Use CircularProgress for loading state */}
            {loading ? (
              <CircularProgress id="CircularProgress" color='secondary' />
            ) : (
              // Render a regular button when not loading
              <Button type="submit" variant="contained" color="secondary" fullWidth>
                Sign In
              </Button>
            )}
          </form>
          <Link to="/login">Already have an account? Login</Link>

          {/* Success dialog */}
          <Dialog open={successDialog} onClose={handleCloseSuccessDialog}>
            <DialogTitle>You have successfully registered</DialogTitle>
            <DialogContent>
              <Typography>Redirecting to the home page...</Typography>
            </DialogContent>
          </Dialog>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
