import {configureStore} from '@reduxjs/toolkit';

import ProductReducer from '../redux/slices/ProductsSlice';
import WishlistReducer from '../redux/slices/WishlistSlice';
import CartReducer from '../redux/slices/CartSlice';
import AddressReducer from '../redux/slices/addressSlice';
import OrderReducer from '../redux/slices/OrderSlice';

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    wishlist: WishlistReducer,
    cart: CartReducer,
    address: AddressReducer,
    order: OrderReducer,
  },
});
