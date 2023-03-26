
import { mockedInitialState, profileID, getInitialDataResponse, getFidelizationFormDataResponse, mockNetWorkResponse } from "../../fixtures/fidelizationFixtures";
import reducer, { changeStep, clientFidelizationSlice, iniState } from "../../../src/store/slices/fidelizarCliente/clientFidelizationSlice";
import { INITIAL_SCREEN_DATA_ENDPOINT } from "../../../src/Components/FidelizarCliente/FidelizarCliente";
import { getInitialData, getFidelizationFormData } from "../../../src/store/slices/fidelizarCliente/thunks";
import { store } from "../../../src/store/store";

describe('Validaciones sobre el Slice de redux clientFidelizationSlice.js y los thunks asíncronos', () =>{

    test('Comprueba que el reducer changeStep establezca correctamente la nueva propiedad en el state', ()=>{
        const state = clientFidelizationSlice.reducer(mockedInitialState, changeStep('initialScreen'));
        expect(state.loyaltyStep).toEqual('initialScreen');
    });

    test("Debe devolver el estado inicial", () => {
        expect(
            reducer(undefined, {
                type: undefined,
            })
        ).toEqual(mockedInitialState);
    });

    /**
     * probando el thunk que obtiene los datos iniciales del componente
     */
    describe("Obtiene los datos de la pantalla inicial del componente", () => {
        beforeAll(() => {
            mockNetWorkResponse();
        });

        it("Hace la solicitud de los datos y comprueba que el dispatch los haya establecido en el state", async () => {
            const result = await store.dispatch(getInitialData(INITIAL_SCREEN_DATA_ENDPOINT));

            expect(result.type).toBe("clientFidelization/getInitialData/fulfilled");
            const state = store.getState().clientFidelization;

            expect(state.isLoading).toBeFalsy();
            expect(state.initialScreenData).toEqual(getInitialDataResponse);
            expect(state.loyaltyStep).toEqual('initialScreen');
        });
    });

    /**
     * probando el thunk que obtiene los datos del formulario correspondiente a un perfil de fidelización
     */
    describe("Obtiene los datos de la pantalla inicial del componente", () => {
        beforeAll(() => {
            mockNetWorkResponse();
        });

        it("Hace la solicitud de los datos y comprueba que el dispatch los haya establecido en el state", async () => {
            const result = await store.dispatch(getFidelizationFormData(profileID));

            expect(result.type).toBe("clientFidelization/getFidelizationFormData/fulfilled");
            const state = store.getState().clientFidelization;

            expect(state.isLoading).toBeFalsy();
            expect(state.activeFormData).toEqual(getFidelizationFormDataResponse);
            expect(state.loyaltyStep).toEqual('profileForm');
        });
    });


    //TODO: Hacer los test para el resto de thunks

});