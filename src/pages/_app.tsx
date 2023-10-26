import store from "@/store";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "@/styles/globalStyles";
import { defaultTheme } from "@/styles/theme/default";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <ThemeProvider theme={defaultTheme}>
          <Component {...pageProps} />
          <GlobalStyle />
        </ThemeProvider>
      </ConfigProvider>
    </Provider>
  );
}
