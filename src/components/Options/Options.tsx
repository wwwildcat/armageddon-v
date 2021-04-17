import Links from '../Links/Links';
import './Options.scss';

const Options = () => (
    <div className="Options">
        <div className="Options-Filter">
            <input className="Options-Checkbox" id="hazardous" type="checkbox" />
            <label htmlFor="hazardous">Показать только опасные</label>
        </div>
        <Links active={1} className="Options-Links">
            <span>{'Расстояние '}</span>
            <button className="Options-Button">{'в километрах, '}</button>
            <button className="Options-Button">в дистанциях до луны</button>
        </Links>
    </div>
);

export default Options;
