import { AsteroidShortJSON } from '../store/types';

export const formatAllAsteroids = (json: AsteroidShortJSON[]) =>
    json.map(
        ({
            id,
            name,
            is_potentially_hazardous_asteroid,
            estimated_diameter: {
                meters: { estimated_diameter_max, estimated_diameter_min },
            },
            close_approach_data: [
                {
                    close_approach_date,
                    miss_distance: { kilometers, lunar },
                },
            ],
        }) => ({
            id: id,
            name: name,
            isHazardous: is_potentially_hazardous_asteroid,
            inDestructionList: false,
            diameter: (estimated_diameter_min + estimated_diameter_max) / 2,
            closeApproach: {
                date: close_approach_date,
                distance: {
                    kilometers: kilometers,
                    lunar: lunar,
                },
            },
        })
    );
