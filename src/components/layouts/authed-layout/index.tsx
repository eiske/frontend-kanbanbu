import IsAuthed from '@/components/is-authed';
import store from '@/store';
import { Layout } from 'antd';
import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import styles from './index.module.css';
import Header from '../components/header';

const { Content } = Layout;

const AuthedLayout = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
        <Layout>
            <Header />
            <Content className={styles.mainContent}>{children}</Content>
        </Layout>
    </Provider>
);

export const AuthedPageLayout = (page: ReactElement) => (
    <IsAuthed>
        <AuthedLayout>{page}</AuthedLayout>
    </IsAuthed>
);

export default AuthedLayout;
