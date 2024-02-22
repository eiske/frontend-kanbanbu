import { AppstoreFilled } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import styled from 'styled-components';

const { Header } = Layout;

export const Container = styled(Header)`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0;
    background-color: #9a9b9c3a;
    line-height: normal;
    height: 60px;

    img {
        align-self: center;
        width: 180px;
    }

    @media (max-width: 990px) {
        padding-top: 10px;
        align-items: center;
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
        display: none;
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
        display: none;
    }
`;

export const MenuIcon = styled(AppstoreFilled)`
    font-size: 32px;
    cursor: pointer;

    @media screen and (min-width: 992px) {
        display: none;
    }
`;
