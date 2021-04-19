import { useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistance, formatDiameter, formatDate } from 'src/utils/formatCardData';
import { addToDestructionList } from '@store/actions';
import State, { AsteroidShort } from '@store/types';
import Button from '../Button/Button';
import Dino from '../svg/dino.svg';
import Asteroid from '../svg/asteroid.svg';
import './Card.scss';

interface Props {
    asteroid: AsteroidShort;
}

const Card = ({ asteroid }: Props) => {
    const {
        id,
        name,
        isHazardous,
        inDestructionList,
        diameter,
        closeApproach: { date, distance },
    } = asteroid;
    const distanceType = useSelector((state: State) => state.distanceType);
    const [awaitDestruction, setAwaitDestruction] = useState(inDestructionList);
    const dispatch = useDispatch();

    const handleClick = (id: string) => {
        dispatch(addToDestructionList(id));
        setAwaitDestruction(true);
    };

    return (
        <div className="Card">
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
                    <Link href={`/${id}`}>{name}</Link>
                </div>
                <ul className="Card-List">
                    <li className="Card-Item">
                        <div>Дата</div>
                        <div className="Card-Dots"></div>
                        <div>{formatDate(date)}</div>
                    </li>
                    <li className="Card-Item">
                        <div>Расстояние</div>
                        <div className="Card-Dots"></div>
                        <div>{formatDistance(distance[distanceType], distanceType)}</div>
                    </li>
                    <li className="Card-Item">
                        <div>Размер</div>
                        <div className="Card-Dots"></div>
                        <div>{formatDiameter(diameter)}</div>
                    </li>
                </ul>
            </div>
            <div className="Card-Result">
                Оценка:
                <div className="Card-IsHazardous">{isHazardous ? 'опасен' : 'не опасен'}</div>
                {awaitDestruction ? (
                    <span className="Card-AwaitDestruction">Ожидает уничтожения</span>
                ) : (
                    <Button handler={() => handleClick(id)} text="На уничтожение" />
                )}
            </div>
        </div>
    );
};

export default Card;
