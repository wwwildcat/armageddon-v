import { AsteroidShort, CloseApproachDataFull } from '@store/types';
import CardShort from './-Short/Card-Short';
import CardFull from './-Full/Card-Full';
import './Card.scss';

interface Props {
    asteroid: AsteroidShort;
    closeApproachFull?: CloseApproachDataFull[];
    type: 'short' | 'full';
}

const Card = ({ asteroid, closeApproachFull, type }: Props) => (
    <div className="Card" data-testid={`card-${type}`}>
        <CardShort asteroid={asteroid} type={type} />
        {type === 'full' && (
            <CardFull closeApproachFull={closeApproachFull as CloseApproachDataFull[]} />
        )}
    </div>
);

export default Card;
