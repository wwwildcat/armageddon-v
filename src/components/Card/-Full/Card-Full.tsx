import { useSelector } from 'react-redux';
import {
    formatDistance,
    formatDateFull,
    formatVelocity,
    formatOrbitingBody,
    OrbitingBodies,
} from '@utils/formatCardData';
import State, { CloseApproachDataFull } from '@store/types';
import CardList from '../-List/Card-List';

interface Props {
    closeApproachFull: CloseApproachDataFull[];
}

const CardFull = ({ closeApproachFull }: Props) => {
    const distanceType = useSelector((state: State) => state.distanceType);

    return (
        <div className="Card-Full">
            <div className="Card-Approaches">Сближения:</div>
            {closeApproachFull?.map(({ dateFull, distance, velocity, orbitingBody }, index) => (
                <CardList
                    items={[
                        { name: 'Время', value: formatDateFull(dateFull) },
                        { name: 'Скорость', value: formatVelocity(velocity) },
                        {
                            name: 'Расстояние',
                            value: formatDistance(distance[distanceType], distanceType),
                        },
                        {
                            name: 'Центр орбиты',
                            value: formatOrbitingBody(orbitingBody as OrbitingBodies),
                        },
                    ]}
                    key={index}
                />
            ))}
        </div>
    );
};

export default CardFull;
