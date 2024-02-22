import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/store';
import { notification } from 'antd';
import { login, signUp } from '@services/user';
import useUser from '.';

const mockLoginService = { login, signUp };

jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock('@services/user', () => ({
    login: jest.fn(),
    signUp: jest.fn(),
}));

const spyLogin = jest.spyOn(mockLoginService, 'login');
const spySignUp = jest.spyOn(mockLoginService, 'signUp');

const spyNotificationInfo = jest.spyOn(notification, 'info');
const spyNotificationSuccess = jest.spyOn(notification, 'success');

const getUseUserHook = () => {
    const { result } = renderHook(() => useUser(), {
        wrapper: ({ children }) => (
            <Provider store={store}>{children}</Provider>
        ),
    });

    return { result };
};

const email = 'test@example.com';
const password = 'password';

describe('useUser', () => {
    it('should return an object with login, signUp, signed and fetching properties', () => {
        const { result } = getUseUserHook();

        expect(result.current.login).toBeInstanceOf(Function);
        expect(result.current.signUp).toBeInstanceOf(Function);
        expect(result.current.signed).toBe(false);
        expect(result.current.fetching).toBe(false);
    });

    it('should show error notification when login function fails', async () => {
        const { result } = getUseUserHook();

        await act(async () => {
            await result.current.login(email, password);
        });

        expect(spyNotificationInfo).toHaveBeenCalledWith({
            message: 'Serviço indisponível',
            placement: 'top',
        });
    });

    it('should set user info in localSotage and show success notification', async () => {
        const { result } = getUseUserHook();
        const loginResponse = {
            data: {
                id: 'id123',
                name: 'Dog',
                token: 'token123',
            },
        };
        spyLogin.mockResolvedValue(loginResponse as any);

        await act(async () => {
            await result.current.login(email, password);
        });

        expect(spyLogin).toHaveBeenCalled();
    });

    it('should sign up the user', async () => {
        const { result } = getUseUserHook();
        spySignUp.mockResolvedValue({} as any);
        await act(async () => {
            await result.current.signUp('Diana', email, password);
        });

        expect(spyNotificationSuccess).toBeCalled();
    });

    it('should show error on sign up the user', async () => {
        const { result } = getUseUserHook();
        spySignUp.mockRejectedValue({} as any);
        await act(async () => {
            await result.current.signUp('Diana', email, password);
        });

        expect(spyNotificationInfo).toBeCalled();
    });
});
