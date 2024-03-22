import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    data:[],
}

export const OrderReducer = createReducer(initialState,(builder) => {
    builder.addCase("ADD_ORDER", (state, action) => {
        state.loading = false;
         state.data = [...state.data, action.payload]
    })
})