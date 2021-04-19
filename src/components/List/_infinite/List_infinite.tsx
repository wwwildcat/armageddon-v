import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchAllAsteroids } from '@store/thunks';

interface Props {
    children: React.ReactElement[];
    linkToNext: string;
}

const ListInfinite = ({ children, linkToNext }: Props) => {
    const dispatch = useDispatch();
    const loadMore = () => {
        dispatch(fetchAllAsteroids(linkToNext));
    };

    return (
        <InfiniteScroll
            dataLength={children.length}
            hasMore={true}
            loader={<div>Loading...</div>}
            next={loadMore}
        >
            {children}
        </InfiniteScroll>
    );
};

export default ListInfinite;
