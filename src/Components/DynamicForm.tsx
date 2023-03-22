import { useForm } from 'react-hook-form';
import Button from './Button';
import CloseIcon from './CloseIcon';
import { ILoyaltyForm } from './FidelizarCliente';

type FormFields = {
    email: string;
    password: string;
}

interface Props{
    formData: ILoyaltyForm;
    onSubmitForm: ()=>void;
}

const DynamicForm = ({formData, onSubmitForm}: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();

    return (
        <div style={{
            minHeight: '100%',
            width: '100%',
            maxWidth: '400px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>

            <div style={{borderBottom: '1px solid grey', padding: '1em', display: 'flex', justifyContent: 'space-between'}}>
                <span>Atrás</span>
                <CloseIcon Color='black' Size={16} onClick={()=>{alert("Pendiente de implementar")}} />
            </div>

            <div style={{display: 'flex', padding:'1em', flexDirection:'column', height: '100%', flex: 1, gap: '3em', marginTop: '2em'}}>

                <h2 style={{textAlign:'center'}}>Titulo</h2>

                <form onSubmit={handleSubmit(onSubmitForm)} noValidate style={{display: 'flex', height: '100%', flexDirection: 'column', flex: 1, justifyContent:'space-between', gap: '2em'}}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '2em'}}>

                            {
                                formData.Fields.map(field =>(
                                    <div key={field.Name} style={{display: 'flex', flexDirection: 'column', gap: '0.5em'}}>
                                        <label htmlFor={field.Name}> { field.Description } </label>
                                        <input
                                            type="text"
                                            id={field.Name}
                                            { ...register('email', {
                                                required: 'Este campo es obligatorio',
                                            })
                                            }
                                        />
                                    </div>
                                ))
                            }


                            {/* <div style={{display: 'flex', flexDirection: 'column', gap: '0.5em'}}>
                                <label htmlFor="fname">Email</label>
                                <input
                                    type="text"
                                    id="fname"
                                    { ...register('email', {
                                        required: 'Este campo es obligatorio',
                                    })
                                    }
                                />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5em'}}>
                                <label htmlFor="fname">Email</label>
                                <input
                                    type="text"
                                    id="fname"
                                    { ...register('email', {
                                        required: 'Este campo es obligatorio',
                                    })
                                    }
                                />
                            </div> */}
                        </div>
                        {/* //TODO: Modificar el componente, pasarle el tipo (text, submit, ...) */}
                        <Button Text='Enviar' onClick={()=>alert('pendiente de implementar')} Type='Filled' />

                </form>
            </div>

        </div>
    )
}

export default DynamicForm;