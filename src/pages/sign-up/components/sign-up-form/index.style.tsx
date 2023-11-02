import { Form } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;

    .logo {
        background: black;
        width: 50%;
        text-align: center;
        margin-top: 10px;
        border-radius: 4px 4px 0 0;

        @media (max-width: 640px) {
            width: 90%;
        }

        h1 {
            color: white;
            font-weight: bold;
            margin: 0;
            padding: 10px;
        }
    }
`;

export const FormContainer = styled(Form)`
    text-align: center;
    background: lightgray;
    border-radius: 5px;
    padding: 50px;
    width: 50%;

    @media (max-width: 640px) {
        width: 90%;
    }

    h2 {
        font-weight: bold;
    }

    button {
        margin: 10px 0;
        width: 100%;
    }

    input[type="password"] {
        margin: 0;
    }
`;
