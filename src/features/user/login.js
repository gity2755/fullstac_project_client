import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Container, Paper, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, ThemeProvider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginInServer } from './userApi.js';
import { userIn } from './userSlice.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import './login.css'
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
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
 
  const onSubmit = async (data) => {
    try {
      const { userName, password } = data;
      const credentials = { userName, password };
      try {
        setLoading(true);
        const response = await loginInServer(credentials);
        console.log("Response from server:", response.data);
        dispatch(userIn(response.data));
        console.log("user in login : "+user);
        navigate('/homePage');
      } catch (error) {
        setShowDialog(true);
        dispatch(userIn(null));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <ThemeProvider theme={myTheme}>
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20,marginBottom:30 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("userName", { required: "Name is required" })}
            label="userName"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />
          <TextField
            {...register("password", { required: "Password is required" })}
            label="password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth >
            Login
          </Button>
        </form>

        {loading && <CircularProgress id="CircularProgress" color='secondary' />}
        
      </Paper>
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>We don't know you yet.</DialogTitle>
        <DialogContent>
          <Typography>Want to join us?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" outLined>
            <Link to="/signIn" id="linkSignIn">Sign In</Link>
          </Button>
          <Button onClick={handleCloseDialog}color="secondary" outLined>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </ThemeProvider>
  );
};

export default Login;
