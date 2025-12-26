import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        initialized: false,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload
            state.initialized = true
        },
        logout(state) {
            state.user = null;
            state.initialized = true
            localStorage.clear()
        }
    }
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer