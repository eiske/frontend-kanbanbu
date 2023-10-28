import { Button, Input, Spin, notification } from "antd";
import { useEffect, useState } from "react";
import { Container, LoginContainer } from "./index.style";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import useUser from "@hooks/use-user";
import { useRouter } from "next/router";

type LoginPayload = {
    email: string;
    password: string;
};

const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

const LoginForm = () => {
    const { login, isLoading, signed } = useUser();
    const router = useRouter();
    const [loginPayload, setLoginPayload] = useState<LoginPayload>({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (signed) {
            router.push("/");
        }
    }, [signed]);

    const handleLogin = async () => {
        await login(loginPayload.email, loginPayload.password);
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
                <h2>Login</h2>
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
                    {!isLoading ? "Entrar" : <Spin indicator={antIcon} />}
                </Button>
                <Link href="/sign-up">
                    <Button>Cadastrar</Button>
                </Link>
            </LoginContainer>
        </Container>
    );
};

export default LoginForm;
