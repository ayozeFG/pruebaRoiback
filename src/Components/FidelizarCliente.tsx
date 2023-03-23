import { useEffect, useState } from "react";
import { IDynamicFieldData } from "../Interfaces/dynamicFieldsData";
import Button from "./Button";
import { Form } from "./CustomForm/DynamicForm";
import FullScreenLoading from "./FullScreenLoading";

const INITIAL_SCREEN_DATA_ENDPOINT = 'Mocks/selectScreen.json';

export interface IinitalScreenData {
    Title: string
    subTitle: string
    Registered: string
    Profiles: IProfile[]
}
export interface IProfile {
    ID: string
    apiURL: string
    Description: string
}
export interface ILoyaltyForm {
    Title: string
    Fields: IDynamicFieldData[]
}

const FidelizarCliente = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [initialData, setInitialData] = useState<IinitalScreenData>();
    const [loyaltyFormData, setLoyaltyFormData] = useState<ILoyaltyForm>();
    const [loyaltyStep, setLoyaltyStep] = useState<'initialScreen' | 'profileForm' | 'formSent'>('initialScreen');

    useEffect(() => {
        setTimeout(() => { //Timeout de prueba para simular un poco de lentitud en la petición y ver la pantalla de carga
            fetch(INITIAL_SCREEN_DATA_ENDPOINT)
                .then(res =>{
                    //TODO: Cuando sea necesario, controlar el error.
                    //if(!res.ok) throw new Error('No se pudo cargar los datos');

                    return res.json();
                })
                .then(data => {
                    setIsLoading(false);
                    setInitialData(data);
                })
                .catch((err) =>{
                    //TODO: Gestionar el error
                });
        }, 200);
    }, []);

    const handleProfileSelect = (apiURL: RequestInfo | URL)=>{
        setIsLoading(true);
        setTimeout(() => { //Timeout de prueba para simular un poco de lentitud en la petición y ver la pantalla de carga
            fetch(apiURL)
                .then(res =>{
                    //TODO: Cuando sea necesario, controlar el error.
                    //if(!res.ok) throw new Error('No se pudo cargar los datos');

                    return res.json();
                })
                .then(data => {
                    console.log(data)
                    setIsLoading(false);
                    setLoyaltyFormData(data);
                    setLoyaltyStep('profileForm');
                })
                .catch((err) =>{
                    //TODO: Gestionar el error
                });
        }, 200);
    }

    const showScreen = ()=>{

        if(loyaltyStep === 'initialScreen' && initialData){
            return <div style={{
                maxHeight: '80vh',
                width: '90%',
                maxWidth: '400px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                textAlign: 'center'
            }}>
                <h2>{ initialData.Title }</h2>

                <p style={{marginTop: '3em'}}>{ initialData.subTitle }</p> {/* TODO: Hacer una variable en css para el margen, para mantener el mismo entre las diferentes pantallas del proceso */}

                {/* Genera los botones que permiten al cliente seleccionar su perfil de fidelización */}
                <div style={{display: 'flex', flexDirection:'column', gap: '24px', marginTop: '12px'}}>
                    {
                        initialData.Profiles.map( profile => (
                            <Button
                                key={profile.ID}
                                Text={profile.Description}
                                Style='Outlined'
                                onClick={()=>{handleProfileSelect(profile.apiURL)}}
                            />
                        ))
                    }
                </div>
            </div>
        }else if(loyaltyStep === 'profileForm' && loyaltyFormData){
            return <Form formData={loyaltyFormData}/>
        }else if(loyaltyStep === 'formSent'){

        }

        return <h2>Upss!! algo a ido mal. Disculpe las molestias</h2>; //TODO: Se podría hacer una pantalla de error a mostrar en estos casos
    }

    return (
        <>
            {
                //TODO: Cambiar esto por un isLoading... siempre que se esté cargando, poner el div de carga. si no está cargando
                //puede ser que se esté mostrando la pantalla inicial, o que ya esté en un formulario
                isLoading
                ?
                    <FullScreenLoading/>
                :
                    showScreen()
            }
        </>
    )
}

export default FidelizarCliente;