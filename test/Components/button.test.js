import { screen, render, fireEvent } from "@testing-library/react";
import Button from "../../src/Components/Buttons/Button";

describe('Componentente <Button />', () =>{

    test('Debe renderizar un elemento de tipo "button" que se le haya pasado por las props', ()=>{
        const texto = "Enviar";

        render (<Button Text={texto} />);
        expect(screen.getByRole('button')).toBeTruthy();
        expect(screen.getByText(texto)).toBeTruthy();
    });

    test('Al hacer click sobre el botón se debe ejecutar la función pasada por las props', ()=>{
        const handleClick = jest.fn();

        render (<Button Text="Enviar" onClick={handleClick} />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalled();
    });

});