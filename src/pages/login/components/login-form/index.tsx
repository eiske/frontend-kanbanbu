import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import Link from 'next/link';
import useUser from '@hooks/use-user';
import { useRouter } from 'next/router';
import { Container, FormContainer } from './index.style';

const LoginForm = () => {
    const { login, fetching, signed } = useUser();
    const router = useRouter();
    const [form] = Form.useForm();

    useEffect(() => {
        if (signed) {
            router.push('/');
        }
    }, [signed]);

    const onFinish = async () => {
        await login(
            form.getFieldValue('email'),
            form.getFieldValue('password')
        );
    };

    return (
        <Container>
            <div className="logo">
                <h1>Kanbanbu</h1>
            </div>
            <FormContainer form={form} onFinish={onFinish}>
                <h2>Login</h2>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor coloque o seu email!',
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
                            message: 'Por favor coloque a sua senha!',
                        },
                    ]}
                >
                    <Input.Password size="small" placeholder="Senha" />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={fetching}>
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
