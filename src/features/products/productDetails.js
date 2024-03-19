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



// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, Typography, Button, styled, ThemeProvider, createTheme, CardActions, IconButton, Grid } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { useParams } from 'react-router-dom';
// import { getItemById } from './productsApi';
// import { useNavigate } from 'react-router-dom';
// import cart from './add-to-cart.png';
// import { useSelector } from 'react-redux';
// import './productDetails.css';
// import { useDispatch } from 'react-redux';
// import { addToBasket } from '../basket/basketSlice.js';
// import SmallBasket from '../basket/smallBasket.js';
// import { Magnifier } from 'react-image-magnifiers'; // Import Magnifier component

// const myTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#11111',
//     },
//     secondary: {
//       main: '#e91e63',
//     },
//   },
// });

// const StyledProductDetails = styled(Card)(({ myTheme }) => ({
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '80%',
//   height: '85%',
//   backgroundColor: 'white',
//   zIndex: 10,
//   marginLeft: '10vw',
//   marginTop: '12vh',
// }));

// const ProductDetails = () => {
//   let { id } = useParams();
//   const navigate = useNavigate();
//   let [item, setItem] = useState(getItemById(id));
//   const user = useSelector((state) => state.user.currentUser);
//   const [toShowSmallBasket, setToShowSmallBasket] = useState(false);
//   console.log("url "+item.url);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getItemById(id);
//         setItem(response.data);
//       } catch (error) {
//         alert(error.message);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleAddToBasket = () => {
//     dispatch(addToBasket(item));
//     setToShowSmallBasket(true);
//   };

//   return (
//     <>
//       <ThemeProvider theme={myTheme}>
//         <StyledProductDetails>
//           <Grid container>
//             <Grid item xs={12} md={6} id='media'>
//               {/* Use Magnifier component around the product image */}
//               <Magnifier
//                 imageSrc={`http://localhost:5000/${item.url}`}
//                 imageAlt={item.name}
//                 style={{ width: '100%', height: '100%' }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <CardContent className="content" id="content" style={{ width: '100%', height: '64%', marginLeft: '0vw' }}>
//                 <Typography className='details' id="title" variant="h6" color="text.secondary">
//                   {item.name}
//                 </Typography>
//                 <Typography className='details' id="description" variant="body1" color="text.secondary">
//                   {item.description}
//                 </Typography>
//                 <Typography className='details' id="price" variant="body1" color="text.primary">
//                   Price: {item.price}
//                 </Typography>
//                 <CardActions disableSpacing>
//                   {user.role === 'user' && (
//                     <>
//                       <IconButton aria-label="add to favorites">
//                         <FavoriteIcon />
//                       </IconButton>
//                       <IconButton onClick={handleAddToBasket}>
//                         <img id="add-to-cart-img" src={cart} alt="Add to Cart" />
//                       </IconButton>
//                     </>
//                   )}
//                 </CardActions>
//                 <Button
//                   className="btn"
//                   color="secondary"
//                   aria-label="increase"
//                   onClick={() => navigate(-1)}>
//                   Back to Shopping
//                 </Button>
//               </CardContent>
//             </Grid>
//           </Grid>
//         </StyledProductDetails>
//       </ThemeProvider>
//       {toShowSmallBasket && <SmallBasket />}
//     </>
//   );
// };

// export default ProductDetails;
