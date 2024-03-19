import React from 'react';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';

const SignUp = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        
        <Typography variant="h5" gutterBottom>
             Sign Up
           </Typography>
           <form>
             <TextField
               label="Full Name"
               variant="outlined"
               margin="normal"
               required
               fullWidth
             />
             <TextField
               label="Email"
               variant="outlined"
               margin="normal"
               required
               fullWidth
             />
             <TextField
               label="Password"
               type="password"
               variant="outlined"
               margin="normal"
               required
               fullWidth
             />
             <Button type="submit" variant="contained" color="primary" fullWidth>
               Sign Up
             </Button>
           </form>
         </Paper>
       </Container>
     );
   };

   export default SignUp;
