import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    data: [],
}
export const AddressReducer = createReducer(initialState,(builder) => {
    builder.addCase("LOAD_ADDRESS",(state, action) => {
        state.loading = false;
        state.data = action.payload
    })
    builder.addCase("ADD_ADDRESS", (state, action) => {
        state.loading = false,
        state.data = [...state.data, action.payload]
    })
    builder.addCase("DELETE_ADDRESS", (state, action) => {
        state.loading = false;
      let newArr = state.data.filter(item => {
        return item.id !== action.payload.id
      })
      state.data = newArr
    })
    builder.addCase("UPDATE_ADDRESS", (state, action) => {
         state.loading = false;
         let temp = state.data;
         temp.map(item => {
            if(item.id === action.payload.id){
                item.state = action.payload.state;
                item.pinCode = action.payload.pinCode;
                item.city = action.payload.city;
                item.country = action.payload.country;
                item.type = action.payload.type;
            }
         })
         state.data = temp
    })
})