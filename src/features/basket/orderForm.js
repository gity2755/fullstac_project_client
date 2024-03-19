import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Paper, Typography, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Link } from "@mui/material";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useForm, Controller } from "react-hook-form";
import { addOrder } from "./ordersApi";
import { useSelector } from "react-redux";
import { okToOrder } from "./basketSlice";
import { pink } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import userEvent from '@testing-library/user-event';
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


const ProductOrderForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const stripePromise = loadStripe("your_stripe_public_key");

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const basketToOrder = useSelector((state) => state.myBasket.basketToOrder);

  const onSubmit = async (data) => {
    try {
      console.log("user in form ; " + user.token);
      await addOrder({
        shipingAdress: {
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          building: data.address.houseNumber,
          PostalCode: Number.zipCode
        },
        items: basketToOrder
      }, user.token);

      setSuccessDialogOpen(true);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Please sign in");
      }
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  return (
    <ThemeProvider theme={myTheme}>
    <Container>
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5" gutterBottom>
          Product Order Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.country"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField label="Country" {...field} fullWidth required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField label="City" {...field} fullWidth required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.street"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField label="Street" {...field} fullWidth required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.houseNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField label="House Number" {...field} fullWidth required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.zipCode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField label="Zip Code" {...field} fullWidth required />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Credit Card field */}
              <Controller
                name="creditCardNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Elements stripe={stripePromise}>
                    <CardElement
                      options={{
                        style: { base: { fontSize: "16px" } },
                      }}
                      {...field}
                      required
                    />
                  </Elements>
                )}
              />
            </Grid>
            <Grid item xs={12}>
            <Button type="submit" variant="contained" color="secondary">
              Submit Order
            </Button>
          </Grid>
          </Grid>
        </form>
        {Object.keys(errors).length > 0 && (
          <Alert severity="error" style={{ marginTop: "16px" }}>
            Please fill out all required fields.
          </Alert>
        )}

        {/* Success dialog */}
        <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
          <DialogTitle>Order Successful</DialogTitle>
          <DialogContent>
            <Typography>
              The order was successfully placed. The order and delivery details were sent to you by email.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Link href="/homePage" color="inherit" underline="hover">
              Go to Home Page
            </Link>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container></ThemeProvider>
  );
};

export default ProductOrderForm;