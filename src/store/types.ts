interface AsteroidJSON {
    id: string;
    name: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: {
        meters: {
            estimated_diameter_max: number;
            estimated_diameter_min: number;
        };
    };
}

interface ClosestApproachJSON {
    close_approach_date: string;
    miss_distance: { kilometers: string; lunar: string };
}

export interface CloseApproachFullJSON extends ClosestApproachJSON {
    close_approach_date_full: string;
    relative_velocity: {
        kilometers_per_second: string;
    };
    orbiting_body: string;
}

export interface AsteroidShortJSON extends AsteroidJSON {
    close_approach_data: ClosestApproachJSON[];
}

export interface AsteroidFullJSON extends AsteroidJSON {
    close_approach_data: CloseApproachFullJSON[];
}

export interface ClosestApproachData {
    date: string;
    distance: {
        kilometers: string;
        lunar: string;
    };
}

export interface CloseApproachDataFull extends ClosestApproachData {
    dateFull: string;
    velocity: string;
    orbitingBody: string;
}

export interface AsteroidShort {
    id: string;
    name: string;
    isHazardous: boolean;
    diameter: number;
    inDestructionList: boolean;
    closestApproach: ClosestApproachData;
}

export type DistanceType = 'kilometers' | 'lunar';

export interface AsteroidFull {
    asteroid: AsteroidShort;
    closeApproachFull: CloseApproachDataFull[];
}

export default interface State {
    allAsteroids: AsteroidShort[];
    currentAsteroid: AsteroidFull;
    hazardous: boolean;
    distanceType: DistanceType;
    error: Error;
    linkToNext: string;
}
