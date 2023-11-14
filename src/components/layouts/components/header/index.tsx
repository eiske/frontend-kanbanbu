import React from 'react';
import Link from 'next/link';
import useUser from '@hooks/use-user';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Container, Menu, LogOut } from './index.styles';

const Header = () => {
    const { logout } = useUser();
    const router = useRouter();
    return (
        <Container>
            <div className="logo"><h1>Kanbanbu</h1></div>
            <Menu>
                <Link href="/" className={router.pathname === '/' ? 'active' : ''}>Board</Link>
                <Link href="/subjects-list" className={router.pathname === '/subjects-list' ? 'active' : ''}>Disciplinas</Link>
                <Link href="/agenda" className={router.pathname === '/agenda' ? 'active' : ''}>Agenda</Link>
            </Menu>
            <LogOut>
                <Button onClick={logout}>Sair</Button>
            </LogOut>
        </Container>
    );
};

export default Header;
