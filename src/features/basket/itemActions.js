import { useState } from "react";
import { addToBasket, deleteFromBasket, decreaseItem } from "./basketSlice.js";
import { useSelector, useDispatch } from 'react-redux'
import "./itemActions.css"
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/system";
import { pink } from "@mui/material/colors";
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
const ItemActions = ({ item }) => {
    let array = useSelector(sta => sta.myBasket.basket)
    let [arr, setArr] = useState(array || [])
    console.log("arr from actions " + arr[0]);
    let dispatch = useDispatch();
    const deleteFromServer = async () => {
        try {
            console.log("Before delete - arr:", array);
            let res = arr.filter(it => it._id !== item._id);
            setArr(res);
            dispatch(deleteFromBasket(item));
            console.log("After delete - arr:", array);
        } catch (err) {
            alert("מחיקה נכשלה");
            console.error(err);
        }
    };

    const decreaseItemFromServer = async () => {
        try {
            setArr((prevArr) => {
                return prevArr.map((itemInArr) => {
                    if (itemInArr._id === item._id && itemInArr.qty!==1) {
                        return { ...itemInArr, qty: itemInArr.qty - 1 };
                    }
                    else if (itemInArr._id === item._id && itemInArr.qty===1) {
                        deleteFromServer()
                    }
                    return itemInArr;
                });
            });
            dispatch(decreaseItem(item));
        } catch (err) {
            alert("ההפחתה נכשלה");
            console.log(err);
        }
    };
    
    const increaseItemFromServer = async () => {
        try {
            setArr((prevArr) => {
                return prevArr.map((itemInArr) => {
                    if (itemInArr._id === item._id) {
                        return { ...itemInArr, qty: itemInArr.qty + 1 };
                    }
                    return itemInArr;
                });
            });
            dispatch(addToBasket(item));
        } catch (err) {
            alert("ההפחתה נכשלה");
            console.log(err);
        }
    };
    
    
    return (
    <ThemeProvider theme={myTheme}><> <div className="buttons">
          <ButtonGroup color="secondary">
          <Button
            aria-label="reduce"
            onClick={decreaseItemFromServer}
          >
            <RemoveIcon fontSize="small" color="secondary" />
          </Button>
          <Button
            aria-label="increase"
            onClick={increaseItemFromServer}
          >
            <AddIcon fontSize="small" color="secondary"/>
          </Button>
          <Button
            aria-label="increase"
            onClick={(deleteFromServer)}
          >
               <DeleteIcon color="secondary" />
          </Button>
        </ButtonGroup>
        {/* <input type='button' name="increaseItem" value="+" onClick={increaseItemFromServer} />
        <input type='button' name="decreaseItem" value="-" onClick={decreaseItemFromServer} />
        <input type='button' id="deleteButton" name="deleteItem" value="delete item" onClick={(deleteFromServer)} /> */}
    </div>
    </></ThemeProvider>);
}

export default ItemActions;