import { configureStore } from '@reduxjs/toolkit';
import { layoutSlice } from './slices/layout-slice';


const store = configureStore({
    reducer: {
        layout: layoutSlice.reducer
    },
});

export const layoutActions = layoutSlice.actions;
export default store;