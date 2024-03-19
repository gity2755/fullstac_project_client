import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { addItem } from './productsApi';
import { useSelector } from 'react-redux';
const AddItemForm = () => {
  const user = useSelector((state) => state.user.currentUser);
console.log("user in add item :"+user);  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    count: '',
    url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const  handleSubmit = async(e) => {
    e.preventDefault();
    // Add your logic to handle form submission (e.g., dispatching an action to add the item)
    console.log('Form Data:', formData);
    // Reset the form after submission
    setFormData({
      name: '',
      description: '',
      price: '',
      count: '',
      url: '',
    });
    console.log("token from add item form "+user.token);
    try {
      await addItem(formData, user.token)
      alert("You added the item successfully")
    } catch (err) {
    if(err.response.data.status==401){
      alert("you ara not authorized"+err);}
    else if (err.response.data.status==409)
    alert("this item is already exist");
     else  alert(err.response.data.message)
          console.log(err);
}
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5" gutterBottom>
          Add Item
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Count"
                name="count"
                type="number"
                value={formData.count}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="URL"
                name="url"
                value={formData.url}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddItemForm;
