import Link from 'next/link';
import cn from 'classnames';
import { formatDistance, formatDiameter, formatDate } from 'src/utils/formatCardData';
import { AsteroidShort, DistanceType } from '@store/types';
import Dino from '../svg/dino.svg';
import Asteroid from '../svg/asteroid.svg';
import './Card.scss';

interface Props {
    asteroid: AsteroidShort;
    distanceType: DistanceType;
}

const Card = ({ asteroid, distanceType }: Props) => {
    const {
        id,
        name,
        isHazardous,
        diameter,
        closeApproach: { date, distance },
    } = asteroid;

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
                <button className="Card-Button">На уничтожение</button>
            </div>
        </div>
    );
};

export default Card;
