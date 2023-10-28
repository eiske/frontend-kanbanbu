import { useDispatch } from "react-redux";
import {
    USER_ID_KEY,
    USER_NAME_KEY,
    USER_TOKEN_KEY,
} from "@constants/storage-keys";
import { login } from "@services/user";
import { setUserInfo } from "@features/userSession/userSessionSlice";
import { useEffect, useState } from "react";
import { notification } from "antd";

const useUser = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        setSigned(!!localStorage.getItem(USER_TOKEN_KEY));
    }, []);

    const userLogin = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const response = await login(email, password);
            localStorage.setItem(
                USER_TOKEN_KEY,
                JSON.stringify(response.data.token)
            );
            localStorage.setItem(USER_ID_KEY, JSON.stringify(response.data.id));
            localStorage.setItem(
                USER_NAME_KEY,
                JSON.stringify(response.data.name)
            );
            dispatch(setUserInfo(response?.data));
        } catch (error: any) {
            notification.info({
                message: `${
                    error?.response?.data?.error === undefined
                        ? "Serviço indisponível"
                        : error?.response?.data?.error
                }`,
                placement: "top",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login: userLogin,
        signed,
        isLoading,
    };
};

export default useUser;
