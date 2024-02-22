import {
    fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';
import SignUpForm from '.';

const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
);

const mockSignUp = jest.fn();

jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock('@hooks/use-user', () => ({
    __esModule: true,
    default: () => ({
        fetching: false,
        signUp: mockSignUp,
        signed: true,
    }),
}));

describe('<SignUpForm />', () => {
    beforeEach(() => {
        render(
            <Wrapper>
                <SignUpForm />
            </Wrapper>
        );
    });

    it('should render a form with input fields for name, email and password', () => {
        expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    });

    it('should call signUp function', async () => {
        const nameInput = screen.getByPlaceholderText('Nome');
        const emailInput = screen.getByPlaceholderText('Email');
        const pwdInput = screen.getByPlaceholderText('Senha');
        const signUpButton = screen.getByText('Cadastrar');

        fireEvent.change(nameInput, {
            target: { value: 'Eiske' },
        });
        fireEvent.change(emailInput, {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(pwdInput, {
            target: { value: 'password123' },
        });

        fireEvent.click(signUpButton);

        await waitFor(() => {
            expect(mockSignUp).toHaveBeenCalled();
        });
    });
});
