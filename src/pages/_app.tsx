import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { useStore } from '@store/createStore';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
    const store = useStore(pageProps.initialReduxState);

    return (
        <CookiesProvider>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </CookiesProvider>
    );
}

export default MyApp;
