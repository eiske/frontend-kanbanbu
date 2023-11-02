import { USER_TOKEN_KEY } from '@/constants/storage-keys';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';

const IsAuthed = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const redirectUrl = '/login';

    useEffect(() => {
        if (isLoggedIn && router.isReady) router.push(router.asPath);
    }, [isLoggedIn, router.isReady]);

    useEffect(() => {
        setIsloggedIn(!!localStorage.getItem(USER_TOKEN_KEY));

        if (!localStorage.getItem(USER_TOKEN_KEY)) router.push(redirectUrl);
    }, []);

    return <div>{isLoggedIn && children}</div>;
};

export default IsAuthed;
