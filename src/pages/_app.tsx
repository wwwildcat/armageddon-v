import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from '@store/createStore';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
    const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
