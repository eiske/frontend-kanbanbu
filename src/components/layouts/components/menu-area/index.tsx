import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container } from './index.styles';

interface Link {
    href: string;
    className?: string;
    label: string;
}

const links: Link[] = [
    {
        href: '/',
        label: 'Board',
    },
    {
        href: '/subjects-list',
        label: 'Disciplinas',
    },
    {
        href: '/agenda',
        label: 'Agenda',
    },

];

const MenuArea = () => {
    const router = useRouter();

    return (
        <Container>
            {
                links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={router.pathname === link.href ? 'active' : ''}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))
            }
        </Container>
    );
};

export default MenuArea;
