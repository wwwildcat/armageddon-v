import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import cn from 'classnames';
import { formatDistance, formatDiameter, formatDate } from '@utils/formatCardData';
import State, { AsteroidShort } from '@store/types';
import { addToDestructionList } from '@store/actions';
import CardList from '../-List/Card-List';
import Button from '../../Button/Button';
import Dino from '../../svg/dino.svg';
import Asteroid from '../../svg/asteroid.svg';

interface Props {
    asteroid: AsteroidShort;
    type: 'short' | 'full';
}

const CardShort = ({
    asteroid: {
        id,
        name,
        diameter,
        isHazardous,
        inDestructionList,
        closestApproach: { date, distance },
    },
    type,
}: Props) => {
    const distanceType = useSelector((state: State) => state.distanceType);
    const [awaitDestruction, setAwaitDestruction] = useState(inDestructionList);
    const [, setCookie] = useCookies([id]);
    const dispatch = useDispatch();

    useEffect(() => {
        setAwaitDestruction(inDestructionList);
    }, [inDestructionList]);

    const handleButtonClick = () => {
        dispatch(addToDestructionList(id));
        setAwaitDestruction(true);
        setCookie(id, true);
    };

    return (
        <div className="Card-Short">
            <div className={cn('Card-Background', isHazardous && 'Card-Background_hazardous')}>
                <div
                    className="Card-Asteroid"
                    style={
                        {
                            '--left-shift': `${Math.sqrt(diameter) * 5}px`,
                            '--bottom-shift': `${Math.sqrt(diameter) * 0.2}px`,
                            height: Math.sqrt(diameter) * 10,
                            width: Math.sqrt(diameter) * 10,
                        } as React.CSSProperties
                    }
                >
                    <Asteroid height="100%" viewBox="0 0 71 72" width="100%" />
                </div>
                <Dino className="Card-Dino" viewBox="0 0 56 48" />
            </div>
            <div className="Card-Info">
                <div className="Card-Title">
                    {type === 'short' ? (
                        <Link
                            href={{
                                pathname: '/asteroid',
                                query: { id: id },
                            }}
                        >
                            {name}
                        </Link>
                    ) : (
                        name
                    )}
                </div>
                <CardList
                    items={[
                        { name: 'Дата', value: formatDate(date) },
                        {
                            name: 'Расстояние',
                            value: formatDistance(distance[distanceType], distanceType),
                        },
                        { name: 'Размер', value: formatDiameter(diameter) },
                    ]}
                />
            </div>
            <div className="Card-Result">
                Оценка:
                <div className="Card-IsHazardous">{isHazardous ? 'опасен' : 'не опасен'}</div>
                {awaitDestruction ? (
                    <span className="Card-AwaitDestruction">Ожидает уничтожения</span>
                ) : (
                    <Button handler={handleButtonClick} text="На уничтожение" />
                )}
            </div>
        </div>
    );
};

export default CardShort;
