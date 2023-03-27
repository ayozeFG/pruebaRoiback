import { createSelector, createSlice } from '@reduxjs/toolkit';
import { IAdvantages, IinitalScreenData, IFidelizationForms } from '../../../Interfaces/';
import { getInitialData, getFidelizationFormData, registerFidelization, loadProfileAdvantages } from './thunks';
import { RootState } from '../../store';

export interface IInitialState {
    //Datos de la pantalla inicial donde se selecciona un tipo de perfil de fidelización
    initialScreenData?: IinitalScreenData | null;
    //Datos de los formularios cargados, correspondientes al perfil de fidelización que haya seleccionado. Los almacenamos para evitar realizar peticiones http si entra en un
    //formulario que ya había visto.
    profileForms?: IFidelizationForms | null;
    //Contiene el ID del perfil seleccionado en el que el usuario pretende fidelizarse
    selectedProfileID: string | null;
    isLoading: boolean;
    fidelizationStep: ISteps;
    error: string | null;
    //ID que se obtiene despues de que el cliente haya guardado el formulario y por lo tanto se haya fidelizado correctamente
    registeredID: string | null;
    //Ventajas correspondientes al perfil en el que se haya registrado el cliente
    advantages: IAdvantages | null;
}

type ISteps = 'idle' | 'initialScreen' | 'profileForm' | 'seeAdvantajes';

export const iniState:IInitialState = {
    isLoading: false,
    fidelizationStep: 'idle',
    initialScreenData: null,
    profileForms: null,
    selectedProfileID: null,
    error: null,
    registeredID: null,
    advantages: null,
}

export const clientFidelizationSlice = createSlice({
    name: 'clientFidelization',
    initialState: iniState,
    reducers: {
        changeStep: (state, action: {type: string, payload: ISteps}) =>{
            state.fidelizationStep = action.payload;
        },
        setSelectedProfileID: (state, action: {type: string, payload: string}) =>{
            state.selectedProfileID = action.payload;
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
                state.fidelizationStep = 'initialScreen';
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

                //Inicializa el objeto si aún no se ha había cargado los datos de ningún formulario
                if(!state.profileForms){
                    state.profileForms = {};
                }

                //Guarda en el state los datos del formulario cargado, usando el Id del pefil como clave.
                const IDfromLoadedForm = action.payload.ID;
                state.selectedProfileID = IDfromLoadedForm;
                state.profileForms[IDfromLoadedForm] = action.payload;

                state.fidelizationStep = 'profileForm';
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
                state.fidelizationStep = 'seeAdvantajes';
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
                state.selectedProfileID = null;

                //TODO: Según lo que se quiera hacer despues de registrarse, tomar aquí las acciones correspondientes sobre el state. Se podrían vacía los datos que forman
                //los formularios 'state.profileForms', redirigir a la página correspondiente de la web, etc...
            })
            .addCase(registerFidelization.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.error.message || 'Upss, algo ha ido mal';
            })
    }
});

/**
 * Obtiene del Slice todos los datos de formularios de perfil que se hayan cargado.
 * @returns JSON con los datos de los formularios
 */
export const getFormsLoaded = (state:RootState) => state.clientFidelization?.profileForms;

/**
 * Obtiene los datos correspondientes al formulario de un perfil, los cuales ya estarán previamente cargados y guardados en el slice. Si los datos aún no han sido
 * obtenidos, devolverá un null.
 */
export const getSelectedFormData = createSelector(
    [
        getFormsLoaded,
      (_, ID:string) => ID
    ],
    //Devuelve los datos del formulario de perfil correspondiente al ID proporcionado al llamar al selector
    (forms, ID) => ID && forms ? forms[ID] : null
);

export const { changeStep, setSelectedProfileID } = clientFidelizationSlice.actions;

export default clientFidelizationSlice.reducer;