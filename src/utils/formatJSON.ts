import {
    AsteroidShortJSON,
    AsteroidFullJSON,
    ClosestApproachData,
    CloseApproachFullJSON,
} from '../store/types';

const findClosestApproach = (approaches: CloseApproachFullJSON[], date: string) => {
    const closest = approaches.find((item) => item.close_approach_date === date);

    return {
        date: closest?.close_approach_date,
        distance: {
            kilometers: closest?.miss_distance.kilometers,
            lunar: closest?.miss_distance.lunar,
        },
    };
};

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
            closestApproach: {
                date: close_approach_date,
                distance: {
                    kilometers: kilometers,
                    lunar: lunar,
                },
            },
        })
    );

export const formatCurrentAsteroid = (
    json: AsteroidFullJSON,
    date: string,
    destruction: string
) => {
    const {
        id,
        name,
        is_potentially_hazardous_asteroid,
        estimated_diameter: {
            meters: { estimated_diameter_max, estimated_diameter_min },
        },
        close_approach_data,
    } = json;

    return {
        asteroid: {
            id: id,
            name: name,
            isHazardous: is_potentially_hazardous_asteroid,
            inDestructionList: destruction === 'true',
            diameter: (estimated_diameter_min + estimated_diameter_max) / 2,
            closestApproach: findClosestApproach(close_approach_data, date) as ClosestApproachData,
        },
        closeApproachFull: close_approach_data.map(
            ({
                close_approach_date,
                close_approach_date_full,
                relative_velocity: { kilometers_per_second },
                orbiting_body,
                miss_distance: { kilometers, lunar },
            }) => ({
                date: close_approach_date,
                dateFull: close_approach_date_full,
                velocity: kilometers_per_second,
                orbitingBody: orbiting_body,
                distance: {
                    kilometers: kilometers,
                    lunar: lunar,
                },
            })
        ),
    };
};
