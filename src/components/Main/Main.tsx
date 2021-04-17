import Card from '../Card/Card';
import { formatDistance, formatDiameter, formatDate } from 'src/utils/formatCardData';
import testData from '../testData';

interface Props {
    distanceType: 'kilometers' | 'lunar';
}

const Main = ({ distanceType }: Props) => (
    <main>
        {testData.map(
            (
                {
                    id,
                    name,
                    is_potentially_hazardous_asteroid: isHazardous,
                    estimated_diameter: {
                        meters: {
                            estimated_diameter_max: maxDiameter,
                            estimated_diameter_min: minDiameter,
                        },
                    },
                    close_approach_data: [{ close_approach_date: date, miss_distance }],
                },
                index
            ) => (
                <Card
                    date={formatDate(date)}
                    diameter={formatDiameter(minDiameter, maxDiameter)}
                    distance={formatDistance(miss_distance[distanceType], distanceType)}
                    id={id}
                    isHazardous={isHazardous}
                    key={index}
                    name={name}
                    rate={maxDiameter}
                />
            )
        )}
    </main>
);

export default Main;
