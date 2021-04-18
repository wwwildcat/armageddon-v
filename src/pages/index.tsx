import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '@components/Layout/Layout';
import { fetchAllAsteroids } from '@store/thunks';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllAsteroids());
    }, [dispatch]);

    return <Layout />;
};

export default HomePage;
