//Este archivo JS contiene todas las funciones asincronas que usará el componente <FidelizarCliente/>

import { startLoading, setScreenData, setFormData, changeStep } from "./clientLoyaltySlice";

export const getInitialData = (URL:any) =>{
    return async ( dispatch:any, getState:any ) =>{
        dispatch( startLoading() );

        setTimeout(async() => { //Simula un poco de lentitud en la petición para ver compo responde el componente
            const respuesta = await fetch(URL);
            const data = await respuesta.json();

            //TODO: Controlar que no hubo errores obteniendo los datos, solo actualizar la información del estado si todo fue bien.

            dispatch(setScreenData({
                initialScreenData: data,
            }));
        }, 1000);

    }
}

export const getLoyaltyFormData = (URL:any) =>{
    return async ( dispatch:any, getState:any ) =>{
        dispatch( startLoading() );

        setTimeout(async() => { //Simula un poco de lentitud en la petición para ver compo responde el componente
            const respuesta = await fetch(URL);
            const data = await respuesta.json();

            //TODO: Controlar que no hubo errores obteniendo los datos, solo actualizar la información del estado si todo fue bien.

            dispatch(setFormData({
                formData: data,
            }));

            dispatch(changeStep('profileForm'));
        }, 1000);
    }
}