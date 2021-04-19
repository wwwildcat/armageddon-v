import { useState } from 'react';
import { useSelector } from 'react-redux';
import ListInfinite from './_infinite/List_infinite';
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

    const children = (infinite
        ? asteroids
        : asteroids.filter((item) => item.inDestructionList)
    ).map((asteroid, index) => <Card asteroid={asteroid} key={index} />);

    const [showButton, setShowButton] = useState(true);
    const handleClick = () => {
        setShowButton(false);
    };

    return infinite ? (
        <ListInfinite linkToNext={linkToNext}>{children}</ListInfinite>
    ) : (
        <>
            {children}
            {children.length ? (
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
            )}
        </>
    );
};

export default List;
