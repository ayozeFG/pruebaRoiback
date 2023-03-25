import { useEffect } from 'react';
import CongratulationsPopUp from '../CongratsPopUp/CongratulationsPopUp';
import { Form } from '../CustomForm/DynamicForm';
import FullScreenLoading from '../Loading/FullScreenLoading';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getInitialData } from '../../store/slices/fidelizarCliente/thunks';
import { changeStep } from '../../store/slices/fidelizarCliente/clientLoyaltySlice';
import SelectProfileScreen from './SelectProfileScreen';

const INITIAL_SCREEN_DATA_ENDPOINT = 'api/selectScreen.json';

const FidelizarCliente = () => {

    const dispatch:AppDispatch = useDispatch();
    const { isLoading, initialScreenData, loyaltyStep, activeFormData } = useSelector((state:RootState) => state.clientLoyalty);

    useEffect(() => {
        dispatch( getInitialData(INITIAL_SCREEN_DATA_ENDPOINT) );
    }, []);

    /**
     * Comprueba en que estado se encuentra el componente para renderizar la pantalla correspondiente
     * @returns Devuelve el componente a renderizar
     */
    const showScreen = ()=>{

        if(isLoading)return <FullScreenLoading/>;

        if(loyaltyStep === 'initialScreen' && initialScreenData) return <SelectProfileScreen screenData={initialScreenData} />;

        if(loyaltyStep === 'profileForm' && activeFormData) return <Form formData={activeFormData} onSubmit={onSubmitForm} closeClick={goToStartScreen} goBackClick={goToStartScreen} />;

        if(loyaltyStep === 'formSent') return <CongratulationsPopUp closeClick={goToStartScreen} continueClick={goToStartScreen} />;

        //TODO: Se podría hacer una pantalla de error para mostrar en estos casos inesperados.
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
     * @param formData Datos del formulario
     */
    const onSubmitForm = (formData: any)=>{
        console.log(formData);

        //TODO: Controlar los posibles errores y si todo está correcto, mandar a guardar.

        //Muestra la pantalla final (solo en caso de que se haya completado con éxisto el proceso)
        dispatch(changeStep('formSent'));
    }

    return (
        <>
            {
                showScreen()
            }
        </>
    )
}

export default FidelizarCliente;