import React from "react";
import ItemActions from "./itemActions.js";
import { useSelector } from "react-redux";
import"./oneInBasket.css"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
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
const OneInBasket = ({ id }) => {
  const arr = useSelector((state) => state.myBasket.basketArr);
  const item = arr.find((it) => it._id === id);

  

  // Check if the item exists before accessing its properties
  if (!item) {
    // If item is not found, do not render anything
    return null;
  }

  return (
    <>   
        <ThemeProvider theme={myTheme}>

    <div id="containerDetails">
      <div id="details">
        <h4 className="details">{item.description}</h4>
        <h5 className="details">price : {item.price}.00 NIS</h5>
        <h5 className="details">qty : {item.qty}</h5>
        </div>
         <div id="oneInBasketImg">
        <img id="item-img" src={`http://localhost:5000/${item.url}`} alt={item.name} /></div>
        <div id="actions">
        <ItemActions item={item} /></div></div>
        </ThemeProvider>
    </>
  );
};

export default OneInBasket;
