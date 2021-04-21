import { useSelector, useDispatch } from 'react-redux';
import { setDistanceType, setHazardous } from '@store/actions';
import State, { DistanceType } from '@store/types';
import Links from '../Links/Links';
import './Options.scss';

interface Props {
    showFilter: boolean;
}

enum DistanceTypes {
    kilometers = 1,
    lunar = 3,
}

const Options = ({ showFilter }: Props) => {
    const distanceType = useSelector((state: State) => state.distanceType);
    const hazardous = useSelector((state: State) => state.hazardous);
    const dispatch = useDispatch();

    const handleFilter = (value: boolean) => {
        dispatch(setHazardous(value));
    };

    const handleClick = (type: DistanceType) => {
        dispatch(setDistanceType(type));
    };

    return (
        <div className="Options">
            {showFilter && (
                <div className="Options-Filter">
                    <input
                        className="Options-Checkbox"
                        defaultChecked={hazardous}
                        id="hazardous"
                        onChange={(e) => handleFilter(e.target.checked)}
                        type="checkbox"
                    />
                    <label htmlFor="hazardous">Показать только опасные</label>
                </div>
            )}
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
