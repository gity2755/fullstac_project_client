import List from './features/products/list.js';
import Basket from './features/basket/basket.js';
import { Routes } from 'react-router-dom';
import ProductDetails from './features/products/productDetails.js';
import Login from './features/user/login.js';
import SignUp from './features/user/signUp.js';
import NavBar from './navBar.js';
import { Route } from 'react-router-dom';
import HomePage from './homePage.js';
import OrderForm from './features/basket/orderForm.js'
import SignIn from './features/user/signIn.js';
import { userIn } from './features/user/userSlice.js';
import AddItemForm from './features/products/addItemForm.js';
import UpdateItemForm from './features/products/updateItemForm.js';
import ProtectedRoute from './protectedRout.js';
import Footer from './footer.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import{pushToBasket,pushToBasketToOrder} from './features/basket/basketSlice.js'
import { useSelector } from 'react-redux';
const App = () => {
  let dispatch=useDispatch();
  let currentUser = useSelector((state) => state.user.currentUser)
  useEffect(() => {
    let user = localStorage.getItem("currentUser");
    let basketToOrder = localStorage.getItem("basketToOrder")
    let basketArr = localStorage.getItem("basketArr");

    if (user) {
      dispatch(userIn(JSON.parse(user)));
    }
    if (basketArr) {
      dispatch(pushToBasket(JSON.parse(basketArr)));
    }
    if (user) {
      dispatch(pushToBasketToOrder(JSON.parse(basketToOrder)));
    }
  }, []);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="list" element={<List />}>
          <Route path=":id" element={<ProductDetails />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="basket" element={<Basket />} />
        <Route path="homePage" element={<HomePage />} />
        <Route path="orderForm" element={<OrderForm />} />
        <Route path="signIn" element={<SignIn />} />
        {/* <Route path="addItemForm" element={<AddItemForm />} /> */}
        <Route path="updateItemForm" element={<UpdateItemForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path='addItemForm' element={<ProtectedRoute><AddItemForm /></ProtectedRoute>} />
      </Routes>
      <Footer/>
    </div>)

}

export default App;
