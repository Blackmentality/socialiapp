import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        hideLoader: (state) => {
            state.loading = false
        },
        showLoader: (state) => {
            state.loading = true
        }
    }
});

export const { hideLoader, showLoader } = loaderSlice.actions
export default loaderSlice.reducer;