import React, { useState } from "react";
import OneInBasket from "./oneInBasket.js";
import { useSelector, useDispatch } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import { Link, useNavigate } from "react-router-dom";
import "./basket.css"
import Button from '@mui/material/Button';
import { addToOrder, cancleToOrder } from "./basketSlice.js";
import ButtonGroup from '@mui/material/ButtonGroup';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
const Basket = () => {
  const basket = useSelector(state => state.myBasket.basketArr);
   let sum=useSelector(state=>state.myBasket.sumAllOrder)
   let count=useSelector(state=>state.myBasket.countOfProductsToOrder)

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleAddToOrder = (event,item) => {
    const checked = event.target.checked;
    if (checked) {
      dispatch(addToOrder(item));
    } else {
      dispatch(cancleToOrder(item));

    }
  }

  return (
    <>
        <ThemeProvider theme={myTheme}>

      <h1 id="header">Your Basket</h1>
      {basket&&basket.length === 0 ? (
        <p>Your basket has no products.</p>
      ) : (
        <>
        <h2>TOTAL:
             {sum}
        </h2>
        <h2>
             {count} products in your order
        </h2>
          <ul id="basket">
            {basket.map((item) => (
              <li key={item._id} className="oneInBasket">
                <Checkbox
                  value={item}
                  onChange={(event) => { handleAddToOrder(event,item) }}
                  sx={{
                    color: 'rgb(240, 255, 255)',
                    '&.Mui-checked': { color: pink[600] },
                  }}
                />
                <OneInBasket id={item._id} />
              </li>
            ))}
          </ul>
          <div>
              <ButtonGroup id="buttonGroup" color="secondary" >
          <Button aria-label="reduce" className="btn" color="secondary">
          <Link id="orderButton" to={'/orderForm'}>
            Order
            </Link>
          </Button>
          <Button className="btn" color="secondary"
            aria-label="increase"
            onClick={() => navigate(-1)}
          >  Back to Shopping
          </Button>
        </ButtonGroup>
          </div>
        </>
      )}
      </ThemeProvider>
    </>
  );
};

export default Basket;
