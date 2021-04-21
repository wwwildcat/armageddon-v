import { NextApiRequest } from 'next';
import Layout, { PageType } from '@components/Layout/Layout';
import { initializeStore, StoreExtension } from '@store/createStore';
import { fetchCurrentAsteroid } from '@store/thunks';
import parseCookies from '@utils/parseCookies';

interface GetServerSideCtx {
    req: NextApiRequest;
    query: {
        id: string;
    };
}

export const getServerSideProps = async ({ req, query: { id } }: GetServerSideCtx) => {
    const store = initializeStore();
    const data = parseCookies(req);
    const { dispatch } = store as StoreExtension;

    await dispatch(fetchCurrentAsteroid(id, data[id]));

    const props = { initialReduxState: store.getState() };

    return {
        props: JSON.parse(JSON.stringify(props)),
        notFound: store.getState().error || !store.getState().currentAsteroid,
    };
};

const AsteroidPage = () => <Layout pageType={PageType.asteroid} />;

export default AsteroidPage;
