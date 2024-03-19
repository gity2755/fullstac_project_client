import React, { useState } from 'react';
import OneInSmallBasket from './oneInSmallBasket.js';
import { useSelector, useDispatch } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { addToOrder, cancleToOrder } from './basketSlice.js';

const SmallBasket = () => {
  const basket = useSelector((state) => state.myBasket.basketArr);
  const sum = useSelector((state) => state.myBasket.sumAllOrder);
  const count = useSelector((state) => state.myBasket.countOfProductsToOrder);
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = useState(true);

//   const openDialog = () => {
//     setDialogOpen(true);
//   };

  const closeDialog = () => {
    setDialogOpen(false);
  };
  console.log("small basket : "+basket);
  return (<><Dialog open={isDialogOpen} onClose={closeDialog} style={{backgroundColor:"white"}}>
        <DialogTitle>Your Basket</DialogTitle>
        <DialogContent >
          <ul>
            {basket.map((item) => (
              <li key={item._id}>
                <OneInSmallBasket id={item._id} />
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SmallBasket;
