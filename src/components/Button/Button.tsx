import cn from 'classnames';
import './Button.scss';

interface Props {
    className?: string;
    handler: () => void;
    text: string;
}

const Button = ({ className, handler, text }: Props) => (
    <button className={cn('Button', className)} onClick={handler}>
        {text}
    </button>
);

export default Button;
