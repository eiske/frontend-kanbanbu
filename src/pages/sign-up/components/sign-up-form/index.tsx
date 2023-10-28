import { useState } from "react";
import { Container, FormContainer } from "./index.style";
import { Button, Input } from "antd";
import Link from "next/link";
import useUser from "@hooks/use-user";

const SignUpForm = () => {
    const {fetching, signUp} = useUser()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSignUp = async () => {
        await signUp(form.name, form.email, form.password)
    }

    const disableButton = form.name.trim() === "" || form.email.trim() === "" || form.password.trim() === "";

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
                <Button disabled={disableButton} loading={fetching} type='primary' onClick={handleSignUp}>Cadastrar</Button>
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
            </FormContainer>
        </Container>
    );
};

export default SignUpForm;
