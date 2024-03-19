
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from './productsApi';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './updateForm.css'
import { useNavigate } from 'react-router-dom';

const UpdateForm = ({ item, onClose }) => {
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    price: item.price,
    count: item.count,
    url: item.url,
  });
  const user = useSelector((state) => state.user.currentUser);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updateItem(item._id, formData, user.token);
      onClose(); // Close the dialog when the item is updated
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('You are not authorized');
      }
      console.error('Error updating item:', error.message);
    }
  };

  return (
    <Dialog
      open={true} // Always keep the dialog open
      onClose={onClose} // Call onClose when dialog should be closed
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
      fullWidth>
      <DialogTitle>Update Item</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Count"
            type="number"
            name="count"
            value={formData.count}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="URL"
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" id="button">
          Update
        </Button>
        <Button onClick={onClose} variant="contained" id="button">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateForm;
