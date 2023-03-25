
import styles from './FullLoading.module.css';

export const FullScreenLoading = () => (

    // TODO: Hacer el fadeIn o fadeOut opcional. El primer fullScreenloading de la aplicación que tenga solo fadeOut, para que aparezca inmediatamente.
    // El resto, entre formularios, que tenga fadeIn, así si la petición es muy rápida no se notará el parpadeo.

    <div className={`${styles.container} fadeIn`}>
        <img src='/mvLoading.png' alt='Mobile image for loading screen'></img>
        <h1 className={styles.title}>ROIBACK</h1>
        <h2 className={styles.subTitle}>Mobilis</h2>
        <span className={styles.loadingText}>CARGANDO</span>
    </div>
)

export default FullScreenLoading;