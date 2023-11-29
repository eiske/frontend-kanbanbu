import IsAuthed from '@/components/is-authed';
import store from '@/store';
import { Grid, Layout } from 'antd';
import { PropsWithChildren, ReactElement, useState } from 'react';
import { Provider } from 'react-redux';
import { isDesktop } from '@helpers/index';
import styles from './index.module.css';
import Header from '../components/header';
import Drawer from '../components/drawer';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const AuthedLayout = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const screens = useBreakpoint();

    const onClose = () => {
        setOpen(false);
    };

    const onOpen = () => {
        setOpen(true);
    };

    return (
        <Provider store={store}>
            <Header onOpen={onOpen} />
            <Layout className={styles.mainLayout}>
                {
                    !isDesktop(screens) && (
                        <Drawer
                            open={open}
                            onClose={onClose}
                        />
                    )
                }
                <Content className={styles.mainContent}>{children}</Content>
            </Layout>
        </Provider>
    );
};

export const AuthedPageLayout = (page: ReactElement) => (
    <IsAuthed>
        <AuthedLayout>{page}</AuthedLayout>
    </IsAuthed>
);

export default AuthedLayout;
