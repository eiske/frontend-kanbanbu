import { useState } from "react";
import { Container, FormContainer } from "./index.style";
import { Button, Input } from "antd";
import Link from "next/link";

const SignUpForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    return (
        <Container>
            <div className="logo">
                <h1>Kanbanbu</h1>
            </div>
            <FormContainer>
                <h2>Cadastro</h2>
                <Input
                    placeholder="Nome"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />
                <Input.Password
                    placeholder="Senha"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />
                {/* <Button disabled={textsBlank ? true : false} type='primary' onClick={handleSignUp}>Cadastrar</Button> */}
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
            </FormContainer>
        </Container>
    );
};

export default SignUpForm;
