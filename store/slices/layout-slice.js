import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarVisible: false,
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        showSidebar: (state, action) => {
            state.sidebarVisible = true;
        },
        hideSidebar: (state, action) => {
            state.sidebarVisible = false;
        },
        toggleSidebar: (state, action) => {
            console.log('toggle sidebar visible');
            state.sidebarVisible = !state.sidebarVisible;
        },
    },
});

export const layoutActions = layoutSlice.actions;
export default layoutSlice;