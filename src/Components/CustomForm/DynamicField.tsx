
import { useFormContext } from "react-hook-form";
import { IDynamicFieldData } from "../../Interfaces/dynamicFieldsData";

export const DynamicField = ({ inputType, fieldName, defaultValue, config = {} }: IDynamicFieldData) => {
    const { register } = useFormContext();

    //Controla el tipo de input que se va a generar. Añadir más 'case' cuando se quiera incluir más tipos de inputs en el formulario.
    switch (inputType) {
        case "text":
        return (
            <input
                id={fieldName}
                type="text"
                {...register(fieldName, config)}
                defaultValue={defaultValue}
            />
        );
        case "number":
        return (
            <input
                type="number"
                id={fieldName}
                {...register(fieldName, config)}
                defaultValue={defaultValue}
            />
        );
        default:

        return <input type="text" />;
    }
};
