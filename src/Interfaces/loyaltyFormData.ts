import { IDynamicFieldData } from "./dynamicFieldsData";

export interface ILoyaltyForm {
    ID: string;
    Title: string;
    Fields: IDynamicFieldData[];
}