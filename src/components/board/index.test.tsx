import '../../../.jest/matchMedia';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockedBoard } from '@mocks/board';
import Board from '.';

jest.mock('@hooks/use-board', () => ({
    __esModule: true,
    default: () => ({
        board: mockedBoard,
        fetching: false,
        onFilterCard: jest.fn(),
    }),
}));

describe('<Board />', () => {
    it('should render the board with three columns', () => {
        render(<Board />);

        expect(screen.getByText('Tarefas')).toBeInTheDocument();
        expect(screen.getByText('Fazendo')).toBeInTheDocument();
        expect(screen.getByText('Concluído')).toBeInTheDocument();
    });
});
