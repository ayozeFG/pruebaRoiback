import { IAdvantages } from '../../Interfaces';
import Button from '../Buttons/Button';
import CloseIcon from '../Buttons/CloseIcon';
import styles from './CongratsPopUp.module.css';

interface Props {
    advantages: IAdvantages,
    closeClick: (event: React.MouseEvent<HTMLElement>)=>void;
    continueClick: (event: React.MouseEvent<HTMLElement>)=>void;
}


/**
 * Muestra las ventajes del perfil seleccionado despues de haber rellenado el formulario de fidelización correctamente o si ya estaba fidelizado.
 */
const AdvantagesPopUp = ({advantages, closeClick, continueClick}:Props) => {

    return (
        <div className={`container radius fadeIn ${styles.congratsPopUp}`}>
            <div className={styles.congratsHead}>
                <CloseIcon Size={14} Color='white' butonStyles={{position: 'absolute', right: '12px', top: '12px'}} onClick={closeClick}/>
                <h3>Thank you!</h3>
            </div>
            <div className={styles.contOkIcon}>
                <img src='/check.png' alt="successful icon" width="64px" style={{position:'absolute', left: '50%', transform: 'translate(-50%, -50%)'}} />
            </div>
            <div className={styles.contBody}>
                <p className={styles.advantages}>
                    {advantages.Advantages}
                </p>
                <Button Text='Continue' Style='Filled' onClick={continueClick} />
            </div>
        </div>
    )
}

export default AdvantagesPopUp;