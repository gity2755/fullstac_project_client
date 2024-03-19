import React from "react";
import { useSelector } from "react-redux";
import"./oneInSmallBasket.css"
const OneInSmallBasket = ({ id }) => {
  const arr = useSelector((state) => state.myBasket.basketArr);
  const item = arr.find((it) => it._id === id);

  

  // Check if the item exists before accessing its properties
  if (!item) {
    // If item is not found, do not render anything
    return null;
  }

  return (

      <div id="details">
        <h4>{item.description}</h4>
        <img id="item-img" src={`http://localhost:5000/${item.url}`} alt={item.name} />
        </div>
    
  );
};

export default OneInSmallBasket;
