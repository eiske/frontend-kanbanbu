import IsAuthed from "@/components/is-authed";
import store from "@/store";
import { Layout } from "antd";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import styles from "./index.module.css";

const { Content } = Layout;

const AuthedLayout = ({ children }: PropsWithChildren) => {
    const router = useRouter();

    return (
        <Provider store={store}>
            <Layout>
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
