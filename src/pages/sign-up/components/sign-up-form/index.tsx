import { useState } from "react";
import { Container, FormContainer } from "./index.style";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import useUser from "@hooks/use-user";

const SignUpForm = () => {
    const { fetching, signUp } = useUser();
    const [form] = Form.useForm();

    const onFinish = async () => {
        await signUp(
            form.getFieldValue("name"),
            form.getFieldValue("email"),
            form.getFieldValue("password")
        );
    };

    return (
        <Container>
            <div className="logo">
                <h1>Kanbanbu</h1>
            </div>
            <FormContainer form={form} onFinish={onFinish}>
                <h2>Cadastro</h2>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Por favor coloque o seu nome!",
                        },
                    ]}
                >
                    <Input placeholder="Nome" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Por favor coloque o seu email!",
                        },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Por favor coloque a sua senha!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Senha" />
                </Form.Item>

                <Button loading={fetching} type="primary" htmlType="submit">
                    Cadastrar
                </Button>
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
            </FormContainer>
        </Container>
    );
};

export default SignUpForm;
