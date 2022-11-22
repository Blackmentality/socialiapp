import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        assignUser: (state, data: any) => {
            state.user = data.payload;
            state.loggedIn = true;
        },
        unAssignUser: (state) => {
            state.user = null;
            state.loggedIn = false;
        },
        updateUser: (state, data: any) => {
            state.user = data.payload;
        }
    }
})


export const { assignUser, unAssignUser, updateUser } = authSlice.actions;
export default authSlice.reducer;