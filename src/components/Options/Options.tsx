import { useSelector, useDispatch } from 'react-redux';
import { setDistanceType } from '@store/actions';
import State, { DistanceType } from '@store/types';
import Links from '../Links/Links';
import './Options.scss';

enum DistanceTypes {
    kilometers = 1,
    lunar = 3,
}

const Options = () => {
    const distanceType = useSelector((state: State) => state.distanceType);
    const dispatch = useDispatch();
    const handleClick = (type: DistanceType) => {
        dispatch(setDistanceType(type));
    };

    return (
        <div className="Options">
            <div className="Options-Filter">
                <input className="Options-Checkbox" id="hazardous" type="checkbox" />
                <label htmlFor="hazardous">Показать только опасные</label>
            </div>
            <Links active={DistanceTypes[distanceType]} className="Options-Links">
                <span>{'Расстояние '}</span>
                <button className="Options-Button" onClick={() => handleClick('kilometers')}>
                    в километрах,
                </button>
                <span>{` `}</span>
                <button className="Options-Button" onClick={() => handleClick('lunar')}>
                    в дистанциях до луны
                </button>
            </Links>
        </div>
    );
};

export default Options;
