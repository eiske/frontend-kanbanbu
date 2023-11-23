import { Button } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 24px;

    .logo {
        cursor: default;

        img {
            max-width: 100%;
        }
    }

    @media (max-width: 990px) {
        flex-direction: column;
        text-align: center;

        .logo {
            width: 100%;

            h1 {
                margin: 0 0 30px 0;
                border-radius: 0;
            }
        }
    }
`;

export const Menu = styled.div`
    display: flex;
    justify-content: center;

    a {
        color: #000;
        text-decoration: none;
        font-weight: bold;
        border: 1px solid lightgray;
        border-radius: 10px 10px 0 0;
        padding: 8px 20px;
    }

    a.active {
        background: #000;
        color: #fff;
    }

    a:hover {
        background: #000;
        color: #fff;
        text-decoration:none;
        cursor:pointer;
        transition: 0.3s;
    }

    @media (max-width: 990px) {
        flex-direction: column;
        text-align: center;
        gap: 10px;
        margin-bottom: 10px;
    }
`;

export const LogOut = styled(Button)`
    display: flex;
    justify-content: center;
    color: #000;
    font-weight: bold;
    border: 1px solid lightgray;
    border-radius: 10px 10px 0 0;
    padding: 8px 20px;
    align-items: center;
    border-color: none;

    &:hover {
        background: #000;
        color: #fff !important;
        transition: 0.3s;
        border-color: none;
    }

    @media (max-width: 990px) {
        flex-direction: column;
        text-align: center;
    }
`;
