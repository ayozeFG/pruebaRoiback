import { FormProvider, useForm } from 'react-hook-form';
import { ILoyaltyForm } from '../../Interfaces/loyaltyFormData';
import Button from '../Buttons/Button';
import CloseIcon from '../Buttons/CloseIcon';
import GoBackIcon from '../Buttons/GoBackIcon';
import { DynamicField } from './DynamicField';
import styles from './DynamicForm.module.css';

interface FormProps {
    formData: ILoyaltyForm;
    closeClick: (event: React.MouseEvent<HTMLElement>)=>void;
    goBackClick: (event: React.MouseEvent<HTMLElement>)=>void;
    onSubmit: (data: any)=>void;
}

export const Form = ({ formData, closeClick, goBackClick, onSubmit }: FormProps) => {
    const formMethods = useForm();

    //TODO: Pendiente controlar errores producidos en los campos.
    //TODO: Mantener el botón de enviar deshabilitado hasta que rellenen el formulario.

    const { handleSubmit, formState: { isSubmitting, errors }} = formMethods;

    return (
        <div className={`container ${styles.formScreen}`}>
            <div className={styles.topBar}>
                <GoBackIcon onClick={goBackClick}/>
                <CloseIcon Color='black' Size={16} onClick={closeClick} />
            </div>

            <div className={styles.formCont}>
                <h2 className={styles.title}>{ formData.Title }</h2>

                <form className={styles.formScreenForm} onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className={styles.fieldsCont}>
                            <FormProvider {...formMethods}>
                                {
                                    formData.Fields.map((field, index) => (
                                        <div className={styles.field} key={index}>
                                            {/* Nombre del campo */}
                                            <label className={styles.fieldLabel} htmlFor={field.fieldName}>
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
