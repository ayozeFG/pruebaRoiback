
export const FullScreenLoading = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }}>
        <img src='/mvLoading.png' alt='Mobile image for loading screen'></img>
        <h1 style={{marginTop: '1em'}}>ROIBACK</h1>
        <h2 style={{color: '#C9832C', fontWeight: 100, letterSpacing: '0.3em', fontSize: '0.8em'}}>Mobilis</h2>
        <span style={{marginTop: '2em', letterSpacing: '0.3em', opacity: '0.5'}}>CARGANDO</span>
    </div>
)

export default FullScreenLoading;