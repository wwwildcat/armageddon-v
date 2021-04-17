import Head from 'next/head';
import Header from '../Header/Header';
import Options from '../Options/Options';
import Main from '../Main/Main';
import './Layout.scss';

const Layout = () => (
    <>
        <Head>
            <title>Армагеддон-V</title>
            <link href="/favicon.ico" rel="icon" />
        </Head>
        <div className="Layout">
            <Header active={0} />
            <Options />
            <Main distanceType="kilometers" />
            <footer className="Layout-Footer">2021 © Все права и планета защищены</footer>
        </div>
    </>
);

export default Layout;
