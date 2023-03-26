import { useEffect } from 'react';
import AdvantagesPopUp from '../CongratsPopUp/AdvantagesPopUp';
import DynamicForm from '../CustomForm/DynamicForm';
import FullScreenLoading from '../Loading/FullScreenLoading';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getInitialData, loadProfileAdvantages, registerFidelization } from '../../store/slices/fidelizarCliente/thunks';
import { changeStep } from '../../store/slices/fidelizarCliente/clientFidelizationSlice';
import SelectProfileScreen from './SelectProfileScreen';

export const INITIAL_SCREEN_DATA_ENDPOINT = 'api/selectScreen.json';

const FidelizarCliente = () => {

    const dispatch:AppDispatch = useDispatch();
    const { isLoading, initialScreenData, loyaltyStep, activeFormData, error, registeredID, advantages} = useSelector((state:RootState) => state.clientFidelization);

    /**
     * Carga la información inicial la primera vez que se monta el componente, la cual contendrá los perfiles de fidelización existentes
     */
    useEffect(() => {
        const promise = dispatch( getInitialData(INITIAL_SCREEN_DATA_ENDPOINT) );

        //Nos aseguramos de que si se desmonta el componente se aborte la petición http.
        return ()=>{
            promise.abort();
        }
    }, []);

    /**
     * Una vez se ha registrado el cliente, obtiene las ventajas de la fidelización y le muestra la ventana de bienvenida
     */
    useEffect(() => {
        if(registeredID){
            dispatch(loadProfileAdvantages(registeredID));
        }
    }, [registeredID]);

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
    const onSubmitForm = async(formData: any)=>{
        //TODO: Controlar los posibles errores y si todo está correcto, mandar a guardar.
        //TODO: Agregar al formData el ID de la fidelización seleccionada, el cual se encuentra en el Store en 'activeFormData.ID'
        dispatch( registerFidelization(formData));
    }

    //TODO: Hacer una pantalla para cuando se producen errores
    let contenido = <h2>Upss!! algo a ido mal. Disculpe las molestias</h2>;
    if(error){
        contenido = <h2>Upss!! algo a ido mal {error}</h2>

    }else if(loyaltyStep === 'idle' || isLoading){
        contenido = <FullScreenLoading />;

    }else if(loyaltyStep === 'initialScreen' && initialScreenData){
        contenido = <SelectProfileScreen />;

    }else if(loyaltyStep === 'profileForm' && activeFormData){
        contenido = <DynamicForm formData={activeFormData} onSubmit={onSubmitForm} closeClick={goToStartScreen} goBackClick={goToStartScreen} />;

    } else if(loyaltyStep === 'seeAdvantajes' && advantages){
        contenido = <AdvantagesPopUp advantages={advantages} closeClick={goToStartScreen} continueClick={goToStartScreen} />;

    }

    return contenido;
}

export default FidelizarCliente;