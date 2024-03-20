import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, styled, ThemeProvider, createTheme, CardActions, IconButton, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams } from 'react-router-dom';
import { getItemById } from './productsApi';
import { useNavigate } from 'react-router-dom';
import cart from './add-to-cart.png';
import { useSelector } from 'react-redux';
import './productDetails.css'
import { useDispatch } from 'react-redux';
import { addToBasket } from '../basket/basketSlice.js';
import SmallBasket from '../basket/smallBasket.js';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

const myTheme = createTheme({
  palette: {
    primary: {
      main: '#11111',
    },
    secondary: {
      main: '#e91e63', // Adjust the color to your preference
    },
  },
});

const StyledProductDetails = styled(Card)(({ myTheme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '80%',
  height: '88%',
  backgroundColor: 'white',
  zIndex: 10,
  marginLeft: '10vw',
  marginTop: '12vh',
}));

const ProductDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  let [item, setItem] = useState(getItemById(id));
  const user = useSelector((state) => state.user.currentUser);
  const [toShowSmallBasket, setToShowSmallBasket] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItemById(id);
        setItem(response.data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToBasket = () => {
    dispatch(addToBasket(item));
    setToShowSmallBasket(true);
  };


  console.log(item.name);
  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ThemeProvider theme={myTheme}>
        <StyledProductDetails>
          <Card sx={{ display: 'flex', padding: '10px' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto', padding: '10px' }}>
                <Typography component="div" variant="h7" padding="10px">
                  {item.name}
                </Typography>
                <Typography variant="h5" color="text.secondary" component="div" padding="10px">
                  {item.description}
                </Typography>
                <Typography variant="h6" color="text.secondary" component="div" textAlign='center' padding="10px">
                  price: {item.price}.00 NIS
                </Typography>
                <CardActions disableSpacing>
                  {user&&user.role === 'user' && (
                    <>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton onClick={handleAddToBasket}>
                        <img  id="add-to-cart-img" src={cart} alt="Add to Cart" />
                      </IconButton>
                    </>
                  )}

                </CardActions>
                <Button
                  id="back_to_shopping"
                  className="btn"
                  color="secondary"
                  aria-label="increase"
                  onClick={() => navigate(-1)}>
                  Back to Shopping
                </Button>
              </CardContent>

            </Box>
            <CardMedia

              component="img"
              sx={{ width: 503, paddingLeft: 0 }}
              image={`http://localhost:5000/${item.url}`}
              alt={item.name}

            />
          </Card>


        </StyledProductDetails>
      </ThemeProvider>
      {toShowSmallBasket && <SmallBasket />}

    </>);
};

export default ProductDetails;


