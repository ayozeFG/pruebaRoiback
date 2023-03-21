
const FidelizarCliente = () => {
    return (
        <div style={{
            maxHeight: '80vh',
            width: '100%',
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
            <h2>Sign up</h2>
            {/* TODO: Hacer una variable en css para el margen, para mantener el mismo entre las diferentes pantallas del proceso */}
            <p style={{marginTop: '3em'}}>What kind of user are you?</p>
            <div style={{display: 'flex', flexDirection:'column', gap: '24px', marginTop: '12px'}}>
                <button className="buttonOutlined">A hotel guest</button>
                <button className="buttonOutlined">A travel agency</button>
            </div>
        </div>
    )
}

export default FidelizarCliente;