import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@store/index';
import Header from '.';

jest.mock('next/router', () => ({
    useRouter: () => ({
        pathname: '/',
    }),
}));

describe('<Header />', () => {
    it('should render header component', () => {
        render(
            <Provider store={store}>
                <Header onOpen={jest.fn()} />
            </Provider>
        );
        expect(screen.getByAltText('Plataforma de Organização de Estudos')).toBeInTheDocument();
        expect(screen.getByText('Board')).toBeInTheDocument();
        expect(screen.getByText('Disciplinas')).toBeInTheDocument();
        expect(screen.getByText('Agenda')).toBeInTheDocument();
    });
});
