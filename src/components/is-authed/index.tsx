/* eslint-disable consistent-return */
import { ACCESS_TOKEN_KEY } from 'constants/storage-keys';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';

const IsAuthed = ({ children }: PropsWithChildren<{}>) => {
    const router = useRouter();
    const [isLoggedIn, setIsloggedIn] = useState(false);
    let redirectUrl = '/login';

    useEffect(() => {
        if (isLoggedIn && router.isReady) router.push(router.asPath);
    }, [isLoggedIn, router.isReady]);

    useEffect(() => {
        setIsloggedIn(!!localStorage.getItem('accessToken'));
        
        if (!localStorage.getItem('accessToken')) router.push(redirectUrl);
    }, []);

    return (
        <div>{isLoggedIn && children}</div>
    );
};

export default IsAuthed;
