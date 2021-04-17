import cn from 'classnames';
import './Links.scss';

interface Props {
    active: number;
    className?: string;
    children: React.ReactElement[];
}

const Links = ({ active, className, children }: Props) => (
    <ul className={cn(className, 'Links')}>
        {children.map((child, index) => (
            <span className={cn('Links-Item', index === active && 'Links-Item_active')} key={index}>
                {index === active ? child.props.children : child}
            </span>
        ))}
    </ul>
);

export default Links;
