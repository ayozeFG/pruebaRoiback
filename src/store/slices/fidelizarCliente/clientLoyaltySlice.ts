import { createSlice } from '@reduxjs/toolkit';
import { ILoyaltyForm } from '../../../Interfaces/loyaltyFormData';
import { IinitalScreenData } from '../../../Interfaces/selectProfileScreenData';

type IInitialState = {
    initialScreenData?: IinitalScreenData;
    activeFormData?: ILoyaltyForm;
    isLoading: boolean;
    loyaltyStep: 'initialScreen' | 'profileForm' | 'formSent';
}

const iniState:IInitialState = {
    isLoading: true,
    loyaltyStep: 'initialScreen',
    initialScreenData: undefined,
    activeFormData: undefined,
}

export const clienteLoyaltySlice = createSlice({
    name: 'clientLoyalty',
    initialState: iniState,
    reducers: {
        startLoading: (state, /* action */ ) => {
            state.isLoading = true;
        },
        changeStep: (state, action) =>{
            state.loyaltyStep = action.payload;
        },
        setScreenData: (state, action) =>{
            state.isLoading = false;
            state.initialScreenData = action.payload.initialScreenData;
        },
        setFormData: (state, action) =>{
            state.isLoading = false;
            state.activeFormData = action.payload.formData;
        }
    }
});

//Action creators are generated for each case reducer function
export const { startLoading, setScreenData, setFormData, changeStep } = clienteLoyaltySlice.actions;