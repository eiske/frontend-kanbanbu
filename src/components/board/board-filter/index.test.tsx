import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import BoardFilter from '.';

describe('<BoardFilter />', () => {
    const searchTermTitle = 'Test Title';
    const setSearchTermTitle = jest.fn();
    const handleDateChangeFilter = jest.fn();
    const setSearchTermPriority = jest.fn();

    beforeEach(() => {
        render(<BoardFilter
            searchTermTitle={searchTermTitle}
            setSearchTermTitle={setSearchTermTitle}
            handleDateChangeFilter={handleDateChangeFilter}
            setSearchTermPriority={setSearchTermPriority}
        />);
    });

    it('should render an Input component with a placeholder and a value controlled by searchTermTitle prop', () => {
        const inputElement = screen.getByPlaceholderText<HTMLInputElement>('Buscar tarefa pelo título');

        expect(inputElement).toBeInTheDocument();
        expect(inputElement.value).toBe(searchTermTitle);

        fireEvent.change(inputElement, { target: { value: 'test' } });

        expect(setSearchTermTitle).toHaveBeenCalled();
    });

    it('should call onChange method', () => {
        const inputElement = screen.getByPlaceholderText<HTMLInputElement>('Buscar tarefa pelo título');
        const selectElement = screen.getByText('Prioridade');

        fireEvent.change(inputElement, { target: { value: 'test' } });
        fireEvent.mouseDown(selectElement);
        fireEvent.click(screen.getByText('Baixa'));

        expect(setSearchTermTitle).toHaveBeenCalled();
        expect(setSearchTermPriority).toHaveBeenCalled();
    });
});
