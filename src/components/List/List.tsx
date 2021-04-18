import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../Card/Card';
import { fetchAllAsteroids } from '@store/thunks';
import State from '@store/types';

const List = () => {
    const asteroids = useSelector((state: State) => state.allAsteroids);
    const linkToNext = useSelector((state: State) => state.linkToNext);
    const dispatch = useDispatch();
    const loadMore = () => {
        dispatch(fetchAllAsteroids(linkToNext));
    };

    return (
        <InfiniteScroll
            dataLength={asteroids.length}
            hasMore={true}
            loader={<div>Loading...</div>}
            next={loadMore}
        >
            {asteroids.map((asteroid, index) => (
                <Card asteroid={asteroid} key={index} />
            ))}
        </InfiniteScroll>
    );
};

export default List;
