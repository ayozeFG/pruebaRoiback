import { useEffect } from "react";
import Button from "./Components/Button";
import CongratulationsPopUp from "./Components/CongratulationsPopUp";
import { Form } from "./Components/CustomForm/DynamicForm";
import FullScreenLoading from "./Components/FullScreenLoading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from './store/store';
import { getInitialData, getLoyaltyFormData } from "./store/slices/fidelizarCliente/thunks";
import { changeStep } from "./store/slices/fidelizarCliente/clientLoyaltySlice";

const INITIAL_SCREEN_DATA_ENDPOINT = 'api/selectScreen.json';

const FidelizarCliente = () => {

    const dispatch:AppDispatch = useDispatch();
    const { isLoading, initialScreenData, loyaltyStep, activeFormData } = useSelector((state:RootState) => state.clientLoyalty);

    useEffect(() => {
        dispatch( getInitialData(INITIAL_SCREEN_DATA_ENDPOINT) );
    }, []);

    const handleProfileSelect = (apiURL: RequestInfo | URL)=>{
        dispatch( getLoyaltyFormData(apiURL) );
    }

    const showScreen = ()=>{

        if(loyaltyStep === 'initialScreen' && initialScreenData){
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
                <h2>{ initialScreenData.Title }</h2>

                <p style={{marginTop: '3em'}}>{ initialScreenData.subTitle }</p> {/* TODO: Hacer una variable en css para el margen, para mantener el mismo entre las diferentes pantallas del proceso */}

                {/* Genera los botones que permiten al cliente seleccionar su perfil de fidelización */}
                <div style={{display: 'flex', flexDirection:'column', gap: '24px', marginTop: '12px'}}>
                    {
                        initialScreenData.Profiles.map( profile => (
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
        }else if(loyaltyStep === 'profileForm' && activeFormData){
            return <Form formData={activeFormData} onSubmit={onSubmitForm} closeClick={goToStartScreen} goBackClick={goToStartScreen}/>
        }else if(loyaltyStep === 'formSent'){
            return <CongratulationsPopUp closeClick={goToStartScreen} continueClick={goToStartScreen}/>
        }

        //TODO: Se podría hacer una pantalla de error a mostrar en estos casos
        return <h2>Upss!! algo a ido mal. Disculpe las molestias</h2>;
    }

    /**
     * Responde al click en el botón de cerrar y continuar en la pantalla que se muestra despues de enviar el formulario y en los botones de retroceder y
     * cerrar de cada formulario. Por ahora como en el mockup, y hasta que se definan sus funciones o pantallas de destina, todas regresan al estado inicial.
     */
    const goToStartScreen = ()=>{
        dispatch(changeStep('initialScreen'));
    }

    /**
     * Responde al evento submit sobre el formulario de fidelización
     * @param data Datos del formulario
     */
    const onSubmitForm = (data: any)=>{
        console.log(data);

        //TODO: Controlar los posibles errores y si todo está correcto, mandar a guardar.

        //Muestra la pantalla final (solo en caso de que se haya completado con éxisto el proceso)
        dispatch(changeStep('formSent'));
    }

    return (
        <>
            {
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