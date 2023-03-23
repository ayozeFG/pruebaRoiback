import { FormProvider, useForm } from "react-hook-form";
import Button from "../Button";
import CloseIcon from "../CloseIcon";
import { ILoyaltyForm } from "../FidelizarCliente";
import { DynamicField } from "./DynamicField";

interface FormProps {
    formData: ILoyaltyForm;
}

export const Form = ({ formData }: FormProps) => {
    const formMethods = useForm();
    //TODO: Pendiente controlar errores producidos en los campos.
    //TODO: Mantener el botón de enviar deshabilitado hasta que rellenen el formulario.
    const { handleSubmit, formState: { isSubmitting, errors }} = formMethods;

    function onSubmit(data: any, error:any) {
        console.log(data);
        console.log(error)
        //TODO: Controlar los posibles errores.
        //TODO: Si todo fue bien despues de guardar los datos, mostrar pantalla final
    }

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
                {/* //TODO: Hacer un svg y un componente para la flecha atrás */}
                <span>Atrás</span>
                <CloseIcon Color='black' Size={16} onClick={()=>{alert("Pendiente de implementar")}} />
            </div>

            <div style={{display: 'flex', padding:'1em', flexDirection:'column', height: '100%', flex: 1, gap: '3em', marginTop: '2em'}}>

                <h2 style={{textAlign:'center'}}>{ formData.Title }</h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate style={{display: 'flex', height: '100%', flexDirection: 'column', flex: 1, justifyContent:'space-between', gap: '2em'}}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '2em'}}>

                            <FormProvider {...formMethods}>
                                {
                                    formData.Fields.map((field, index) => (
                                        <div key={index} style={{display: 'flex', flexDirection: 'column', gap: '0.5em'}}>
                                            {/* Nombre del campo */}
                                            <label style={{opacity:0.6}} htmlFor={field.fieldName}>
                                                {`${field.label} ${field?.config?.required && '(required)'}`}
                                            </label>

                                            {/* Input generado dínamicamente a partir de los datos cargados */}
                                            <DynamicField {...field} />
                                        </div>
                                    ))
                                }
                            </FormProvider>

                        </div>
                        <Button Text='Enviar' Type='submit' Style='Filled' Disabled={isSubmitting}/>
                </form>
            </div>

        </div>
    );
};
