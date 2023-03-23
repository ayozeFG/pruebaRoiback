import Button from './Button';
import CloseIcon from './CloseIcon';

const CongratulationsPopUp = () => {
    return (
        <div className='shadowModal' style={{
            minHeight: '400px',
            maxHeight: '80vh',
            width: '90%',
            maxWidth: '400px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
            <div style={{textAlign: 'center', padding: '2em 0', color: 'white', backgroundColor: '#69a9fc'}}>
                <CloseIcon Size={14} Color='white' butonStyles={{position: 'absolute', right: '12px', top: '12px'}} onClick={(event)=>{alert('Cerrar')}}/>
                <h3>Thank you!</h3>
            </div>
            <div style={{position: 'relative', padding: '10px 0px'}}>
                <img src='/check.png' alt="successful icon" width="64px" style={{position:'absolute', left: '50%', transform: 'translate(-50%, -50%)'}} />
            </div>
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5em', overflow: 'auto'}}>
                <p style={{flex: 1, height: '100%', overflow: 'auto'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vor adipisicing elilit. Vom dolor sit amet consectetur adipisicing elit. Voluptate obcaecati aut quas. FugaLorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate obcaecati aut quas. Fuga rerum saepe autem quam repellat magnam, aperiam facilis omnis accusamus ea. Placeat, eaque! Aliquam doloremque minus sit?</p>
                <Button Text='Continue' Style='Filled' onClick={(event) => {alert("Pendiente de implementar")}} />
            </div>
        </div>
    )
}

export default CongratulationsPopUp;