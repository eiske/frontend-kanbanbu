import { setCalendarDate } from "@/features/userSession/userSessionSlice";
import api from "@/services/api";
import { Button, Input, Spin, notification } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, LoginContainer } from "./style";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";

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
      const res = await api.post("/user/login", {
        email: loginPayload.email,
        password: loginPayload.password,
      });
      dispatch(setCalendarDate(res?.data));
      localStorage.setItem("@Kanbanbu:userSession", JSON.stringify(res?.data));
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
    loginPayload.email?.trim() === "" || loginPayload.password?.trim() === "";

  return (
    <Container>
      <div className="logo">
        <h1>StudyNizer</h1>
      </div>
      <LoginContainer>
        <h1>Login</h1>
        <Input
          placeholder="Email"
          value={loginPayload.email}
          onChange={(e) =>
            setLoginPayload({ ...loginPayload, email: e.target.value })
          }
        />
        <Input
          placeholder="Senha"
          value={loginPayload.password}
          onChange={(e) =>
            setLoginPayload({ ...loginPayload, password: e.target.value })
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
