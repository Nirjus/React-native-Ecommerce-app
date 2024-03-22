import {configureStore} from "@reduxjs/toolkit"
import { ProductReducer } from "./slices/ProductReducer"
import { WishlistReducer } from "./slices/WishListReducer"
import { CartReducer } from "./slices/CartReducer"
import { AddressReducer } from "./slices/AddressReducer"
import { OrderReducer } from "./slices/OrderReducer"

export const Store = configureStore({
    reducer:{
        product: ProductReducer,
        wishlist: WishlistReducer,
        cart: CartReducer,
        address: AddressReducer,
        order: OrderReducer
    },
})