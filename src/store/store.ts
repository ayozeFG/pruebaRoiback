import { configureStore } from '@reduxjs/toolkit';
import { clientFidelizationSlice } from './slices/fidelizarCliente/clientFidelizationSlice';

export const store = configureStore({
    reducer: {
       clientLoyalty: clientFidelizationSlice.reducer,

    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch