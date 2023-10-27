import { setCalendarDate } from "@/features/userSession/userSessionSlice";
import { Button, Input, Spin, notification } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, LoginContainer } from "./style";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
    USER_ID_KEY,
    USER_NAME_KEY,
    USER_TOKEN_KEY,
} from "@/constants/storage-keys";
import { login } from "@/services/user";

type LoginPayload = {
    email: string;
    password: string;
};

const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

const LoginForm = () => {
    const [loginPayload, setLoginPayload] = useState<LoginPayload>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await login(
                loginPayload.email,
                loginPayload.password
            );
            dispatch(setCalendarDate(response?.data));
            localStorage.setItem(
                USER_TOKEN_KEY,
                JSON.stringify(response.data.token)
            );
            localStorage.setItem(USER_ID_KEY, JSON.stringify(response.data.id));
            localStorage.setItem(
                USER_NAME_KEY,
                JSON.stringify(response.data.name)
            );
            setLoading(false);
        } catch (error: any) {
            notification.info({
                message: `${
                    error?.response?.data?.error === undefined
                        ? "Serviço indisponível"
                        : error?.response?.data?.error
                }`,
                placement: "top",
            });
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    const textsBlank =
        loginPayload.email?.trim() === "" ||
        loginPayload.password?.trim() === "";

    return (
        <Container>
            <div className="logo">
                <h1>Kanbanbu</h1>
            </div>
            <LoginContainer>
                <h1>Login</h1>
                <Input
                    placeholder="Email"
                    value={loginPayload.email}
                    onChange={(e) =>
                        setLoginPayload({
                            ...loginPayload,
                            email: e.target.value,
                        })
                    }
                />
                <Input.Password
                    size="small"
                    placeholder="Senha"
                    value={loginPayload.password}
                    onChange={(e) =>
                        setLoginPayload({
                            ...loginPayload,
                            password: e.target.value,
                        })
                    }
                />
                <Button
                    disabled={textsBlank ? true : false}
                    type="primary"
                    onClick={handleLogin}
                >
                    {!loading ? "Entrar" : <Spin indicator={antIcon} />}
                </Button>
                <Link href="/sign-up">
                    <Button>Cadastrar</Button>
                </Link>
            </LoginContainer>
        </Container>
    );
};

export default LoginForm;
