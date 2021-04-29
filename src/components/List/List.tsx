import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import Button from '../Button/Button';
import ListContent from './-Content/List-Content';
import State from '@store/types';
import './List.scss';

interface Props {
    infinite: boolean;
}

const List = ({ infinite }: Props) => {
    const asteroids = useSelector((state: State) => state.allAsteroids);
    const hazardous = useSelector((state: State) => state.hazardous);

    const [showButton, setShowButton] = useState(true);
    const [isHazardous, setIsHazardous] = useState(hazardous);

    useEffect(() => {
        setIsHazardous(hazardous);
    }, [hazardous]);

    const handleClick = () => {
        setShowButton(false);
    };

    const filtered = isHazardous ? asteroids.filter((item) => item.isHazardous) : asteroids;
    const children = (infinite
        ? filtered
        : filtered.filter((item) => item.inDestructionList)
    ).map((item) => <Card asteroid={item} key={item.id} type="short" />);

    return (
        <div className="List" data-testid="list">
            <ListContent>{children}</ListContent>
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
