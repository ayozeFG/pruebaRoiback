import { useDispatch, useSelector } from 'react-redux';
import Button from '../Buttons/Button';
import { getFidelizationFormData } from '../../store/slices/fidelizarCliente/thunks';
import { AppDispatch, RootState } from '../../store/store';
import styles from './FidelizarCliente.module.css';
import { useMemo } from 'react';
import { changeStep } from '../../store/slices/fidelizarCliente/clientFidelizationSlice';

const SelectProfileScreen = () => {

    const dispatch:AppDispatch = useDispatch();
    const { isLoading, initialScreenData, registeredID } = useSelector((state:RootState) => state.clientLoyalty);

    /**
     * Controla el click sobre un perfil de fidelización obtiene el formulario correspondiente.
     * @param ID - ID del perfil seleccionado del cual se quiere cargar la información del formulario
     */
    const handleProfileSelect = (ID: string)=>{
        dispatch( getFidelizationFormData(ID) );
    }

    const handleRegistered = (event: React.MouseEvent<HTMLElement>) =>{
        if(registeredID){
            dispatch(changeStep('seeAdvantajes'));
        }else{
            //TODO: Decidir que hacer si no está registrado.
            alert("No estás registrado");
        }
    }

    const renderScreen = useMemo(() => {
        if(initialScreenData) return (
            <>
                <h2 className={styles.profTitle}>{ initialScreenData.Title }</h2>
                <span className={styles.profSubTitle}>{ initialScreenData.subTitle }</span>

                {/* Genera los botones que permiten al cliente seleccionar su perfil de fidelización */}
                <div className={styles.profContBtns}>
                    {
                        initialScreenData.Profiles.map( profile => (
                            <Button
                                key={profile.ID}
                                Text={profile.Description}
                                Style='Outlined'
                                onClick={()=>{handleProfileSelect(profile.ID)}}
                                Disabled={isLoading}
                            />
                        ))
                    }
                </div>

                <span className={styles.profRegistered} onClick={handleRegistered}>{ initialScreenData.Registered }</span>
            </>
        )

        //TODO: Se podría hacer una pantalla de error para mostrar en estos casos inesperados.
        return <h2>Upss!! algo a ido mal. Disculpe las molestias</h2>;

    }, [initialScreenData]);

    return (
        <div className={`container ${styles.profScreen}`}>
           { renderScreen }
        </div>
    )
}

export default SelectProfileScreen;