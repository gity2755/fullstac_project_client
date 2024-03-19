
import { configureStore } from '@reduxjs/toolkit'
import basketSlice from '../features/basket/basketSlice'
import userSlice from '../features/user/userSlice'
export const store = configureStore({
reducer: {myBasket:basketSlice,
    user: userSlice}
})