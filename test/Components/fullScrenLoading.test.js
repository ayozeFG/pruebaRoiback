import { screen, render } from "@testing-library/react";
import FullScreenLoading from "../../src/Components/Loading/FullScreenLoading";

describe('Componentente <FullScreenLoading />', () =>{

    test('Debe contener una imagen. Debe contener el texto "ROIBACK" y el texto "Cargando"', ()=>{
        render (<FullScreenLoading/>);
        expect(screen.getByRole('img')).toBeTruthy();
        expect(screen.getByText(/roiback/i)).toBeTruthy();
        expect(screen.getByText(/cargando/i)).toBeTruthy();
    });

    test('Debe tener la clase "fadeIn" por defecto', ()=>{
        const {container} = render (<FullScreenLoading/>);
        expect(container.getElementsByClassName('fadeIn').length).toBe(1);
    });

    test('Si se le pasa la Prop fadeIn=false, NO debe añadir la clase css que hace el efecto', ()=>{
        const {container} = render (<FullScreenLoading fadeIn={false}/>);
        expect(container.getElementsByClassName('fadeIn').length).not.toBe(1);
    });

});