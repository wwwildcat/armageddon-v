import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import State from '@store/types';

interface Props {
    distanceType: 'kilometers' | 'lunar';
}

const List = ({ distanceType }: Props) => {
    const asteroids = useSelector((state: State) => state.allAsteroids);

    return (
        <main>
            {asteroids.map((asteroid, index) => (
                <Card asteroid={asteroid} distanceType={distanceType} key={index} />
            ))}
        </main>
    );
};

export default List;
