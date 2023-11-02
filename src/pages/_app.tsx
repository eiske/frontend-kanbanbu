import store from '@/store';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/styles/globalStyles';
import { defaultTheme } from '@/styles/theme/default';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component?.getLayout ?? ((page) => page);

    return (
        <Provider store={store}>
            <ConfigProvider>
                <ThemeProvider theme={defaultTheme}>
                    <Head>
                        <title>Kanbanbu</title>
                        <meta
                            name="Kanbanbu"
                            content="Kanbanbu é uma plataforma web e aplicativo projetados para ajudar estudantes a organizar suas atividades acadêmicas, facilitando a gestão de tarefas, prazos e projetos de forma eficiente e inspirada em metodologias ágeis. Nossa missão é proporcionar aos alunos as ferramentas necessárias para otimizar sua rotina de estudos e, consequentemente, melhorar seu desempenho acadêmico."
                        />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1"
                        />
                    </Head>
                    {getLayout(<Component {...pageProps} />)}
                    <GlobalStyle />
                </ThemeProvider>
            </ConfigProvider>
        </Provider>
    );
};

export default App;
