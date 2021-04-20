interface Props {
    items: {
        name: string;
        value: string;
    }[];
}

const CardList = ({ items }: Props) => {
    return (
        <ul className="Card-List">
            {items.map(({ name, value }, index) => (
                <li className="Card-Item" key={index}>
                    <div>{name}</div>
                    <div className="Card-Dots"></div>
                    <div>{value}</div>
                </li>
            ))}
        </ul>
    );
};

export default CardList;
