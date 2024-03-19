import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToBasket } from '../basket/basketSlice.js';
import { deleteById } from './productsApi.js';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './oneProduct.css';
import cart from './add-to-cart.png';
import SmallBasket from '../basket/smallBasket.js';
import UpdateForm from './updateItemForm.js';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ProductDetails from './productDetails'; // Update the path accordingly
import { Link } from 'react-router-dom';
import { pink } from '@mui/material/colors';  
import Badge from '@mui/material/Badge';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const OneProduct = ({ item, deleteFromArr }) => {
  const [toShowSmallBasket, setToShowSmallBasket] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  let [inBasket, setInBasket] = useState(false);


  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const handleAddToBasket = () => {
    dispatch(addToBasket(item));
    setToShowSmallBasket(true);
    setInBasket(true)
  };

  const handleDeleteItem = () => {
    try {
      console.log("user in one product " + user.token);
      alert("are you sure you want to remove this item?")
      deleteById(item._id, user.token);
      deleteFromArr(item._id)
    } catch (err) {
      if (err.status == 401) {
        alert("You are Not authorized")
      }
      console.log(err.message);
    }
  };

  const handleShowUpdateForm = () => {
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  return (
    <>
      {!showUpdateForm ? (
        <div>
          <Card sx={{ maxWidth: 600 }}>
            <CardMedia
              component="img"
              height="350"
              image={`http://localhost:5000/${item.url}`}
              alt={item.name}
            />
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                {item.name}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              {user&&user.role === 'user' && (
                <>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton onClick={handleAddToBasket}>
                    <Badge color="secondary" variant="dot" invisible={!inBasket}>
                      <AddShoppingCartIcon/>
                       </Badge>
                  </IconButton>
                </>
              )}
              {user&&user.role === 'admin' && (
                <>
                  <IconButton id="delete-item" onClick={handleDeleteItem}>
                    <DeleteForeverIcon />
                  </IconButton>
                  <IconButton id="update-item" onClick={handleShowUpdateForm}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
              <Link to={item._id} id="q_v_button">quiqe view</Link>

            </CardActions>
          </Card >
        </div >
      ) : (
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <UpdateForm id="updateForm" item={item} onClose={handleCloseUpdateForm} />
          </CardContent>
        </Card>
      )}

      {toShowSmallBasket && <SmallBasket />}
      {/* { showDetailsDialog && <ProductDetails itemId={item._id} /> } */}
    </>
  );
};

export default OneProduct;
