import Head from 'next/head';
import { useSelector } from 'react-redux';
import State from '@store/types';
import Header from '../Header/Header';
import Options from '../Options/Options';
import List from '../List/List';
import Card from '../Card/Card';
import './Layout.scss';

export enum PageType {
    home = 0,
    asteroid,
    destructionList,
    error,
}

interface Props {
    pageType: PageType;
}

const Layout = ({ pageType }: Props) => {
    const { asteroid, closeApproachFull } = useSelector((state: State) => state.currentAsteroid);

    return (
        <>
            <Head>
                <title>Армагеддон-V</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <div className="Layout">
                <Header active={pageType} />
                {pageType !== PageType.error ? (
                    <>
                        <Options showFilter={pageType !== PageType.asteroid} />
                        {pageType === PageType.asteroid ? (
                            <Card
                                asteroid={asteroid}
                                closeApproachFull={closeApproachFull}
                                type="full"
                            />
                        ) : (
                            <List infinite={pageType === PageType.home} />
                        )}
                    </>
                ) : (
                    <div className="Layout-Error" data-testid="error">
                        Ошибка! Такой страницы нет
                    </div>
                )}
                <footer className="Layout-Footer">2021 © Все права и планета защищены</footer>
            </div>
        </>
    );
};

export default Layout;
