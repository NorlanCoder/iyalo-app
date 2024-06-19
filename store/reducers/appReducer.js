import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {visit: false},
    reducers: {
        onboarding: () => true
    }
});
export const { onboarding } = appSlice.actions;
export default appSlice;