import {
    fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@store/index';
import LoginForm from '.';

const mockLogin = jest.fn();
const mockPush = jest.fn();

jest.mock('next/router', () => ({
    useRouter: () => ({
        push: (str: string) => mockPush(str),
    }),
}));

jest.mock('@hooks/use-user', () => ({
    __esModule: true,
    default: () => ({
        fetching: false,
        login: mockLogin,
        signed: true,
    }),
}));

describe('<LoginForm />', () => {
    it('should call login function', async () => {
        render(
            <Provider store={store}>
                <LoginForm />
            </Provider>
        );
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Senha');
        const loginButton = screen.getByText('Entrar');

        fireEvent.change(emailInput, {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(passwordInput, {
            target: { value: 'password123' },
        });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalled();
        });
    });
});
