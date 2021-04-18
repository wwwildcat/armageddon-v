export interface AsteroidShortJSON {
    links: {
        self: string;
    };
    id: string;
    name: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: {
        meters: {
            estimated_diameter_max: number;
            estimated_diameter_min: number;
        };
    };
    close_approach_data: {
        close_approach_date: string;
        miss_distance: { kilometers: string; lunar: string };
    }[];
}

interface CloseApproachData {
    date: string;
    distance: {
        kilometers: string;
        lunar: string;
    };
}

interface CloseApproachDataFull extends CloseApproachData {
    dateFull: string;
    velocity: string;
    orbitingBody: string;
}

interface Asteroid {
    id: string;
    name: string;
    isHazardous: boolean;
    diameter: number;
    inDestructionList: boolean;
}

export type DistanceType = 'kilometers' | 'lunar';

export interface AsteroidShort extends Asteroid {
    closeApproach: CloseApproachData;
}

export interface AsteroidFull extends Asteroid {
    closeApproachFull: CloseApproachDataFull[];
}

export default interface State {
    allAsteroids: AsteroidShort[];
    currentAsteroid: AsteroidFull;
    distanceType: DistanceType;
    error: Error;
    linkToNext: string;
}
