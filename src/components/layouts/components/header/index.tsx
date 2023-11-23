import React from 'react';
import Link from 'next/link';
import useUser from '@hooks/use-user';
import { useRouter } from 'next/router';
import { Container, Menu, LogOut } from './index.styles';

const Header = () => {
    const { logout } = useUser();
    const router = useRouter();
    return (
        <Container>
            <div className="logo">
                <img alt="Plataforma de Organização de Estudos" src="/logo.svg" />
            </div>
            <Menu>
                <Link href="/" className={router.pathname === '/' ? 'active' : ''}>Board</Link>
                <Link href="/subjects-list" className={router.pathname === '/subjects-list' ? 'active' : ''}>Disciplinas</Link>
                <Link href="/agenda" className={router.pathname === '/agenda' ? 'active' : ''}>Agenda</Link>
            </Menu>
            <LogOut onClick={logout}>
                Sair
            </LogOut>
        </Container>
    );
};

export default Header;
