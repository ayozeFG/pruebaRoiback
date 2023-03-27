import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IFidelizationForm } from '../../Interfaces/loyaltyFormData';
import Button from '../Buttons/Button';
import CloseIcon from '../Buttons/CloseIcon';
import GoBackIcon from '../Buttons/GoBackIcon';
import { DynamicField } from './DynamicField';
import styles from './DynamicForm.module.css';
import { useEffect } from 'react';

interface FormProps {
    formData: IFidelizationForm;
    closeClick: (event: React.MouseEvent<HTMLElement>)=>void;
    goBackClick: (event: React.MouseEvent<HTMLElement>)=>void;
    onSubmit: (data: any)=>void;
}

const DynamicForm = ({ formData, closeClick, goBackClick, onSubmit }: FormProps) => {
    const formMethods = useForm();

    //TODO: Pendiente controlar errores producidos en los campos.

    const { handleSubmit, formState: { isSubmitting, errors }, watch} = formMethods;
    const [allFilled, setallFilled] = useState(false);

    useEffect(() => {
        const subscription = watch((data) =>{
            //TODO: Solo activar el botón cuando estén todos los campos requeridos en lugar de todos directamente.
            const someEmpty = Object.values(data).some(value => value.trim() === "");
            setallFilled(state => !someEmpty);
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, setallFilled]);

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
                        <Button Text='Enviar' Type='submit' Style='Filled' Disabled={isSubmitting || !allFilled}/>
                </form>

            </div>
        </div>
    );
};

export default React.memo(DynamicForm);