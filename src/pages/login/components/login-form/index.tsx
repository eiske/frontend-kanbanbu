import { Button, Input, Spin, notification } from "antd";
import { useEffect, useState } from "react";
import { Container, FormContainer } from "./index.style";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import useUser from "@hooks/use-user";
import { useRouter } from "next/router";

type LoginPayload = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const { login, fetching, signed } = useUser();
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

    const disableButton =
        loginPayload.email?.trim() === "" ||
        loginPayload.password?.trim() === "";

    return (
        <Container>
            <div className="logo">
                <h1>Kanbanbu</h1>
            </div>
            <FormContainer>
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
                    disabled={disableButton}
                    type="primary"
                    onClick={handleLogin}
                    loading={fetching}
                >
                    Entrar
                </Button>
                <Link href="/sign-up">
                    <Button>Cadastrar</Button>
                </Link>
            </FormContainer>
        </Container>
    );
};

export default LoginForm;
