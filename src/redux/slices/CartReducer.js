import {createReducer} from '@reduxjs/toolkit'

const initialState = {
    laoding: false,
    data:[]
}

export const CartReducer = createReducer(initialState, (builder) => {
    builder.addCase("ADDTO_CART", (state, action) => {
        state.laoding = false;
        let isItemExits = false;
        state.data.map((item) => {
           if(item.id === action.payload.item.id){
            isItemExits = true
              item.qty += action.payload.qty ? action.payload.qty : 1;
           }
        })
        if(!isItemExits){
            state.data = [...state.data, action.payload.item]
        }
    })

    builder.addCase("REMOVE_FROM_CART", (state, action) => {
        state.laoding = false;
        let isItemExits = false;
        state.data.map((item) => {
            if(item.id === action.payload.id){
                isItemExits = true;
                if(item.qty > 1){
                    item.qty -= 1;
                }else{
                    isItemExits = false;
                }
            }
        })
        if(!isItemExits){
          state.data.splice(action.payload.index,1);
        }
    })
    builder.addCase("EMPTY_CART", (state, action) => {
        state.laoding = false;
        state.data = []
    })
})