import { IDynamicFieldData } from "./dynamicFieldsData";

export interface IFidelizationForms{
    [key: string]: IFidelizationForm;
}

export type IFidelizationForm = {
    ID: string;
    Title: string;
    Fields: IDynamicFieldData[];
}