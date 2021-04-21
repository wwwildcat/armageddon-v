import Link from 'next/link';
import Links from '../Links/Links';
import './Header.scss';

interface Props {
    active: 0 | 1 | 2 | 3;
}

const Header = ({ active }: Props) => (
    <header className="Header" data-testid="header">
        <div className="Header-Info">
            <div className="Header-Title">ARMAGGEDON V</div>
            <div className="Header-Subtitle">
                Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.
            </div>
        </div>
        <Links active={active} className="Header-Links">
            <Link href="/">Астероиды</Link>
            <span>{` `}</span>
            <Link href="/destruction-list">Уничтожение</Link>
        </Links>
    </header>
);

export default Header;
