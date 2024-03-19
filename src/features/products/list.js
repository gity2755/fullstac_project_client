

import React, { useEffect, useState, useRef } from "react";
import OneProduct from "./oneProduct";
import ProductDetails from "./productDetails";
import { getProducts } from "./productsApi";
import { CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import './list.css'
const myTheme = createTheme({
  palette: {
    primary: {
      main: '#11111',
    },
    secondary: pink,
  },
});

const List = () => {
  const [arr, setArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const sentinelRef = useRef(null);
  const initialFetchDoneRef = useRef(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  let user = useSelector((state) => state.user.currentUser);

  const deleteFromArr = (id) => {
    setArr(arr.filter(item => item._id !== id))
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);

      if (currentPage > 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      const res = await getProducts(currentPage, 6, "");
      const newProducts = res.data;

      if (newProducts.length === 0) {
        setHasMoreProducts(false);
      } else {
        setArr((prevArr) => [...prevArr, ...newProducts]);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.error(err);
      alert("השליפה נכשלה");
    } finally {
      setIsLoading(false);
    }
  };

  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isLoading && hasMoreProducts) {
      fetchData();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoading, hasMoreProducts]);

  useEffect(() => {
    if (!initialFetchDoneRef.current) {
      fetchData();
      initialFetchDoneRef.current = true;
    }
  }, []);

  const handleQuickView = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handleCloseQuickView = () => {
    setSelectedItemId(null);
  };

  return (
    <ThemeProvider theme={myTheme}>
      <>
        <ul className="list">
          {arr && arr.length > 0 && arr.map((item) => (
            <li key={item.id} className="listItem">
              {item && item.name && <OneProduct item={item} arr={arr} deleteFromArr={deleteFromArr} onQuickView={handleQuickView} />}
            </li>
          ))}
        </ul>
        <Outlet />
        {isLoading && (
          <div id="divCircularProgress">
            <CircularProgress id="CircularProgress" color='secondary' />
          </div>
        )}

        {selectedItemId && (
          <ProductDetails
            itemId={selectedItemId}
            onClose={handleCloseQuickView}
          />
        )}

        <div ref={sentinelRef} style={{ height: '10px', background: 'transparent' }} />
      </>
    </ThemeProvider>
  );
};

export default List;
