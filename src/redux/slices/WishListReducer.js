import {createReducer} from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"
const initialState = {

    loading: false,
    data: []
}

export const WishlistReducer = createReducer(initialState, (builder) => {
    builder.addCase("ADDTO_WISHLIST", (state, action) => {
        state.loading = false;
        let isItemExits = false;
        state.data.map((item) => {
           if(item.id === action.payload.id){
            isItemExits = true;
            state.data.splice(action.index, 1)
            const wishlistData = state.data;
            const jsonData = JSON.stringify(wishlistData);
            const asyncFn = async () => {
                await AsyncStorage.setItem("WISHLIST",jsonData);
            }
            asyncFn()
           }
        })
        if(!isItemExits){
            state.data = [...state.data, action.payload];
            const wishlistData = state.data;
            const jsonData = JSON.stringify(wishlistData);
            const asyncFn = async () => {
                await AsyncStorage.setItem("WISHLIST",jsonData);
            }
            asyncFn()
        }
    })
    builder.addCase("LOAD_WISHLIST", (state) => {
        state.loading = false;
        const asyncFn = async () => {
            try {
                const wishlist =  await AsyncStorage.getItem("WISHLIST");
                const jsonData = JSON.parse(wishlist);
                return jsonData   
            } catch (error) {
                console.log(error)
            }
        }

       asyncFn().then((res) => {
            console.log("From Reducer",res)
            state.data = res
        })
    })
})