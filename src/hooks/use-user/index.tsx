import {
    USER_ID_KEY,
    USER_NAME_KEY,
    USER_TOKEN_KEY,
} from '@constants/storage-keys';
import { login, signUp } from '@services/user';
import { setUserInfo } from '@features/userSession/userSessionSlice';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import { UserInfo } from '@services/user/types';
import { getUserId, getUserName, getUserToken } from '@services/utils';
import { useAppDispatch } from '@hooks/use-redux';

const useUser = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [user, setUser] = useState<UserInfo>();
    const [isLogin, setIsLogin] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        setSigned(!!localStorage.getItem(USER_TOKEN_KEY));
    }, []);

    useEffect(() => {
        setUser({
            name: getUserName(),
            id: getUserId(),
            token: getUserToken(),
        });
    }, []);

    const userLogout = () => {
        localStorage.clear();
        router.push('/login');
    };

    const userLogin = async (email: string, password: string) => {
        try {
            setIsLogin(true);
            const response = await login(email, password);
            localStorage.setItem(USER_TOKEN_KEY, response.data.token);
            localStorage.setItem(USER_ID_KEY, response.data.id);
            localStorage.setItem(USER_NAME_KEY, response.data.name);
            router.push('/');
            dispatch(setUserInfo(response?.data));
        } catch (error: any) {
            notification.info({
                message: `${
                    error?.response?.data?.error === undefined
                        ? 'Serviço indisponível'
                        : error?.response?.data?.error
                }`,
                placement: 'top',
            });
        } finally {
            setIsLogin(false);
        }
    };

    const userSignUp = async (
        name: string,
        email: string,
        password: string
    ) => {
        try {
            setIsSignUp(true);
            await signUp(name, email, password);
            notification.success({
                message: 'Usuário cadastrado!',
                placement: 'top',
            });
            await router.push('/login');
        } catch (error: any) {
            notification.info({
                message: `${
                    error?.response?.data?.error === undefined
                        ? 'Serviço indisponível'
                        : error?.response?.data?.error
                }`,
                placement: 'top',
            });
        }
    };

    return {
        login: userLogin,
        signUp: userSignUp,
        logout: userLogout,
        signed,
        fetching: isLogin || isSignUp,
        user,
    };
};

export default useUser;
