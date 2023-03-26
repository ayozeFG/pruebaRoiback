import { createSlice } from '@reduxjs/toolkit';
import { IAdvantages, IinitalScreenData, ILoyaltyForm } from '../../../Interfaces/';
import { getInitialData, getFidelizationFormData, registerFidelization, loadProfileAdvantages } from './thunks';

export interface IInitialState {
    initialScreenData?: IinitalScreenData | null;
    activeFormData?: ILoyaltyForm | null;
    isLoading: boolean;
    loyaltyStep: ISteps;
    error: string | null;
    //ID que se obtiene despues de que el cliente haya guardado el formulario y por lo tanto se haya fidelizado correctamente
    registeredID: string | null;
    //Ventajas correspondientes al perfil en el que se haya registrado el cliente
    advantages: IAdvantages | null;
}

type ISteps = 'idle' | 'initialScreen' | 'profileForm' | 'seeAdvantajes';

export const iniState:IInitialState = {
    isLoading: false,
    loyaltyStep: 'idle',
    initialScreenData: null,
    activeFormData: null,
    error: null,
    registeredID: null,
    advantages: null,
}

export const clientFidelizationSlice = createSlice({
    name: 'clientFidelization',
    initialState: iniState,
    reducers: {
        changeStep: (state, action: {type: string, payload: ISteps}) =>{
            state.loyaltyStep = action.payload;
        },
    },
    extraReducers(builder){
        builder
            //Controla la petición http que carga los datos iniciales del formulario
            .addCase(getInitialData.pending, (state, action)=>{
                state.isLoading = true;
            })
            .addCase(getInitialData.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.initialScreenData = action.payload;
                state.loyaltyStep = 'initialScreen';
            })
            .addCase(getInitialData.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.error.message || 'Upss, algo ha ido mal';
            })

            //Controla la petición http que carga el formulario del perfil de fidelización seleccionado
            .addCase(getFidelizationFormData.pending, (state, action)=>{
                state.isLoading = true;
                state.registeredID = null;
            })
            .addCase(getFidelizationFormData.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.activeFormData = action.payload;
                state.loyaltyStep = 'profileForm';
            })
            .addCase(getFidelizationFormData.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.error.message || 'Upss, algo ha ido mal';
            })

            //Controla la petición http que obtiene las ventajas del perfil en el que se ha registrado el cliente
            .addCase(loadProfileAdvantages.pending, (state, action)=>{
                state.isLoading = true;
            })
            .addCase(loadProfileAdvantages.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.advantages = action.payload;
                state.loyaltyStep = 'seeAdvantajes';
            })
            .addCase(loadProfileAdvantages.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.error.message || 'Upss, algo ha ido mal';
            })

            //Controla la petición http que guarda el formulario que ha rellenado el cliente
            .addCase(registerFidelization.pending, (state, action)=>{
                state.isLoading = true;
            })
            .addCase(registerFidelization.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.registeredID = action.payload;
                state.activeFormData = null;
            })
            .addCase(registerFidelization.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.error.message || 'Upss, algo ha ido mal';
            })
    }
});

export default clientFidelizationSlice.reducer;

//Action creators are generated for each case reducer function
export const {  changeStep } = clientFidelizationSlice.actions;