import { configureStore } from '@reduxjs/toolkit';
import { clienteLoyaltySlice } from './slices/fidelizarCliente/clientLoyaltySlice';


export const store = configureStore({
    reducer: {
       clientLoyalty: clienteLoyaltySlice.reducer,

    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch