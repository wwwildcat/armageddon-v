import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchAllAsteroids } from '@store/thunks';
import Card from '../Card/Card';
import Button from '../Button/Button';
import State from '@store/types';
import './List.scss';

interface Props {
    infinite: boolean;
}

const List = ({ infinite }: Props) => {
    const asteroids = useSelector((state: State) => state.allAsteroids);
    const linkToNext = useSelector((state: State) => state.linkToNext);
    const hazardous = useSelector((state: State) => state.hazardous);

    const dispatch = useDispatch();
    const [showButton, setShowButton] = useState(true);
    const [isHazardous, setIsHazardous] = useState(hazardous);
    const [cookie, , removeCookie] = useCookies();

    const filtered = isHazardous ? asteroids.filter((item) => item.isHazardous) : asteroids;
    const children = (infinite
        ? filtered
        : filtered.filter((item) => item.inDestructionList)
    ).map((asteroid, index) => <Card asteroid={asteroid} key={index} type="short" />);

    useEffect(() => {
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            Object.keys(cookie).forEach((name) => {
                removeCookie(name);
            });
        });
    });
    useEffect(() => {
        setIsHazardous(hazardous);
    }, [hazardous]);

    const handleClick = () => {
        setShowButton(false);
    };

    const loadMore = () => {
        dispatch(fetchAllAsteroids(linkToNext));
    };

    return (
        <div className="List" data-testid="list">
            <InfiniteScroll
                className="List-ItemsContainer"
                hasMore={infinite}
                loader={
                    <div data-testid="loader" key={0}>
                        Loading...
                    </div>
                }
                loadMore={loadMore}
                threshold={500}
            >
                {children}
            </InfiniteScroll>
            {!infinite &&
                (children.length ? (
                    <div className="List-ButtonContainer">
                        {showButton ? (
                            <Button handler={handleClick} text="Заказать бригаду" />
                        ) : (
                            <div className="List-Text">
                                Бригада им. Брюса Уиллиса будет доставлена на выбранные астероиды в
                                нужный момент и выполнит свою нелёгкую работу.
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="List-Text">
                        Вы пока не отправили ни одного астероида на уничтожение.
                    </div>
                ))}
        </div>
    );
};

export default List;
