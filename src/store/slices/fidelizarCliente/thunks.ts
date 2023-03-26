//Este archivo JS contiene todas las funciones asincronas que usará el componente <FidelizarCliente/>

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Obtiene los datos iniciales que incluyen los tipos de perfil de fidelización existentes
 */
export const getInitialData = createAsyncThunk('clientFidelization/getInitialData', async (URL:any, { rejectWithValue }) =>{
    //Ejemplo con fetch:
    // try {

    //    // await wait(500); //Simula un poco de lentitud en la petición para ver compo responde el componente
    //     const respuesta = await fetch(URL);
    //     const data = await respuesta.json();
    //     return data;

    // } catch (err: any) {
    //     //Devuelve el error para que sea capturado en el slice y actualize el estado como corresponde
    //     return rejectWithValue(err.message);
    // }

    //Ejemplo con axios:
    const response = await axios.get(URL);
    return response.data;
})

/**
 * Obtiene los datos del formulario para fidelizarse en un tipo de perfil
 */
export const getFidelizationFormData = createAsyncThunk('clientFidelization/getFidelizationFormData', async (ID:string, { rejectWithValue }) =>{
    // try {

    //     const respuesta = await fetch(`api/Forms/${ID}.json`);
    //     const data = await respuesta.json();
    //     return data;

    // } catch (err: any) {
    //     return rejectWithValue(err.message);
    // }
    const response = await axios.get(`api/Forms/${ID}.json`);
    return response.data;
})

/**
 * Obtiene los datos las ventajas del perfil en el que sea registrado el cliente
 */
export const loadProfileAdvantages = createAsyncThunk('clientFidelization/loadProfileAdvantages', async (profileID:string, { rejectWithValue }) =>{
    // try {
    //     const respuesta = await fetch(`api/Advantages/${profileID}.json`);
    //     const data = await respuesta.json();
    //     return data;

    // } catch (err: any) {
    //     return rejectWithValue(err.message);
    // }
    const response = await axios.get(`api/Advantages/${profileID}.json`);
    return response.data;
})

/**
 * Guarda una nueva fidelización
 */
export const registerFidelization = createAsyncThunk('clientFidelization/registerFidelization', async (formData: FormData, { dispatch, rejectWithValue }) =>{
    try {

       //TODO: Queda comentado porque hasta que exista un end-point real para guardar la información. Por ahora simulamos como que todo fue bien devolviendo un supuesto
       //ID de usuario o de registro.

       //const respuesta = await fetch('api/registerFidelization', {
       //        method: 'POST',
       //        body: formData,
       //        headers: {
       //            'Content-Type': 'application/json'
       //        }
       //});
       //const data = await respuesta.json();

        await wait(500); //Simula un poco de lentitud en la petición para ver compo responde el componente
        //TODO: Supongo que la petición que registra, si fue correctamente devolverá el ID del perfil en el que se registró, o lo obtendremos de otro lugar. Por ahora lo devuelvo
        //aquí para establecerlo en el store.
        const profileID = "Agency";
        return profileID;

    } catch (err: any) {
        return rejectWithValue(err.message);
    }
})


function wait(time:any){
    return new Promise(resolve=>{
        setTimeout(resolve, time);
    })
}
