import Head from 'next/head';
import Header from '../Header/Header';
import Options from '../Options/Options';
import List from '../List/List';
import './Layout.scss';

export enum PageType {
    home = 0,
    asteroid,
    destructionList,
}

interface Props {
    pageType: PageType;
}

const Layout = ({ pageType }: Props) => (
    <>
        <Head>
            <title>Армагеддон-V</title>
            <link href="/favicon.ico" rel="icon" />
        </Head>
        <div className="Layout">
            <Header active={pageType} />
            <Options />
            {pageType !== PageType.asteroid && <List infinite={pageType === PageType.home} />}
            <footer className="Layout-Footer">2021 © Все права и планета защищены</footer>
        </div>
    </>
);

export default Layout;
