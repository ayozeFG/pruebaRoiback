
import { screen, render } from "@testing-library/react";
import FidelizarCliente from "../../src/Components/FidelizarCliente/FidelizarCliente";
import { Provider }  from 'react-redux';
import { createTestStore } from '../fixtures/fidelizationFixtures';
import React from "react";

describe('Prueba el componentente <FidelizarCliente />', () =>{

    test('Debe renderizar el componente y mostar el texto "Cargando"', async()=>{

        let store = createTestStore();
        render(
            <Provider store={store}>
                <FidelizarCliente/>
            </Provider>
        );
        await Promise.resolve();

        //Utilizo una expresión regular para hacer que el texto insesible a mayúsculas y minúsculas
        expect( screen.getByText(/cargando/i) ).toBeTruthy();

    });


    //TODO: Probar que se muestre correctamente el componente según cambia el state

});