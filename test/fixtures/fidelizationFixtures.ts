//Contiene datos mockeados para reutilizar en los test.

import { IinitalScreenData, ILoyaltyForm } from "../../src/Interfaces";
import { IInitialState } from "../../src/store/slices/fidelizarCliente/clientFidelizationSlice";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export const mockedInitialState: IInitialState = {
    isLoading: false,
    loyaltyStep: 'idle',
    initialScreenData: null,
    activeFormData: null,
    error: null,
    registeredID: null,
    advantages: null,
}

export const profileID = "Agency";

const getInitialDataResponse: IinitalScreenData = {
    "Title": "Sign up",
    "subTitle": "What kind of user are your?",
    "Registered": "are you registered?",
    "Profiles": [
        {

            "ID": "Guest",
            "Description": "A hotel guest"

        },
        {

            "ID": "Agency",
            "Description": "A travel agency"

        }
    ]
};

const getFidelizationFormDataResponse: ILoyaltyForm = {
    "ID": "Agency",
    "Title": "Travel Agency",
    "Fields": [
        {
            "fieldName": "companyName",
            "inputType": "text",
            "label": "Company Name",
            "defaultValue": "",
            "config": {
                "required": "Required"
            }
        },
        {
            "fieldName": "agencyID",
            "inputType": "text",
            "label": "Agency Id Code",
            "defaultValue": "",
            "config": {
                "required": "Required"
            }
        },
        {
            "fieldName": "email",
            "inputType": "text",
            "label": "Email",
            "defaultValue": "",
            "config": {
                "required": "Required"
            }
        }
    ]
};

const mockNetWorkResponse = () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`api/selectScreen.json`).reply(200, getInitialDataResponse);
    mock.onGet(`api/Forms/${profileID}.json`).reply(200, getFidelizationFormDataResponse);
};

export {
    mockNetWorkResponse,
    getInitialDataResponse,
    getFidelizationFormDataResponse
};