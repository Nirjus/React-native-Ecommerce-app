import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    data: null
}

export const ProductReducer = createReducer(initialState,(builder) => {
    builder.addCase("ADD_PRODUCT",(state, action) => {
        state.loading = false,
        state.data = action.payload
    })
})
