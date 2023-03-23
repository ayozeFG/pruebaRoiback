import { RegisterOptions } from "react-hook-form";

export type ControlType = "text" | "number"; //Tipos de inputs disponibles para generar.

export interface IDynamicFieldData {
    label: string;
    inputType: ControlType;
    fieldName: string;
    defaultValue: any;
    config?: RegisterOptions;
}
