import { screen, render, fireEvent } from "@testing-library/react";
import CloseIcon from "../../src/Components/Buttons/Button";

describe('Componentente <CloseIcon />', () =>{

    test('Debe renderizar un elemento de tipo "button"', ()=>{
        render (<CloseIcon/>);
        expect(screen.getByRole('button')).toBeTruthy();
    });

    test('Al hacer click sobre el botón se debe ejecutar la función pasada por las props', ()=>{
        const iconClick = jest.fn();

        render (<CloseIcon onClick={iconClick} />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(iconClick).toHaveBeenCalled();
    });

});