import { useDispatch } from 'react-redux';
import Button from '../Buttons/Button';
import { IinitalScreenData } from '../../Interfaces/selectProfileScreenData';
import { getLoyaltyFormData } from '../../store/slices/fidelizarCliente/thunks';
import { AppDispatch } from '../../store/store';
import styles from './FidelizarCliente.module.css';

interface Props {
    screenData: IinitalScreenData;
}

const SelectProfileScreen = ({ screenData }:Props) => {

    const dispatch:AppDispatch = useDispatch();

    const handleProfileSelect = (apiURL: RequestInfo | URL)=>{
        dispatch( getLoyaltyFormData(apiURL) );
    }

    return (
        <div className={`container ${styles.profScreen}`}>

            <h2 className={styles.profTitle}>{ screenData.Title }</h2>
            <p className={styles.profSubTitle}>{ screenData.subTitle }</p>

            {/* Genera los botones que permiten al cliente seleccionar su perfil de fidelización */}
            <div className={styles.profContBtns}>
                {
                    screenData.Profiles.map( profile => (
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
    )
}

export default SelectProfileScreen;