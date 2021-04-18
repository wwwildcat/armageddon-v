/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@components/Layout/Layout';
import { fetchAllAsteroids } from '@store/thunks';
import State from '@store/types';

const HomePage = () => {
    const dispatch = useDispatch();
    const linkToNext = useSelector((state: State) => state.linkToNext);

    useEffect(() => {
        dispatch(fetchAllAsteroids(linkToNext));
    }, [dispatch]);

    return <Layout />;
};

export default HomePage;
