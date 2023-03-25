
import styles from './FullLoading.module.css';

interface Props{
    fadeIn?: boolean;
}

export const FullScreenLoading = ({ fadeIn=true }:Props) => (

    <div className={`${styles.container} ${fadeIn ? 'fadeIn' : ''}`}>
        <img src='/mvLoading.png' alt='Mobile image for loading screen'></img>
        <h1 className={styles.title}>ROIBACK</h1>
        <h2 className={styles.subTitle}>Mobilis</h2>
        <span className={styles.loadingText}>CARGANDO</span>
    </div>
)

export default FullScreenLoading;