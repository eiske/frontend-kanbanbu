import { Button } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-top: 24px;
    margin: 0 20px;

    img {
        max-width: 12%;
    }

    @media (max-width: 990px) {
        padding-top: 10px;
        flex-direction: column;
        text-align: center;
        align-items: center;

        img {
            max-width: 35%;
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
