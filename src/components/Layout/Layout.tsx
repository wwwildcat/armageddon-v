import Head from 'next/head';
import Header from '../Header/Header';
import Options from '../Options/Options';
import List from '../List/List';
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
            <List />
            <footer className="Layout-Footer">2021 © Все права и планета защищены</footer>
        </div>
    </>
);

export default Layout;
