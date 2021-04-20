import { AnyAction } from 'redux';
import {
    SET_ALL_ASTEROIDS,
    SET_LINK_TO_NEXT,
    SET_DISTANCE_TYPE,
    SET_CURRENT_ASTEROID,
    ADD_TO_DESTRUCTION_LIST,
    SET_ERROR,
} from './actionTypes';
import State, { AsteroidShort } from './types';

const reducer = (state: State, action: AnyAction): State => {
    const { type, payload } = action;

    switch (type) {
        case SET_ALL_ASTEROIDS: {
            const { allAsteroids } = state;
            const newAsteroids = payload.filter(
                (newItem: AsteroidShort) =>
                    !allAsteroids.some((oldItem) => newItem.id === oldItem.id)
            );

            return {
                ...state,
                allAsteroids: allAsteroids.concat(newAsteroids),
            };
        }

        case SET_LINK_TO_NEXT:
            return {
                ...state,
                linkToNext: payload.replace('http:', 'https:'),
            };

        case SET_DISTANCE_TYPE:
            return {
                ...state,
                distanceType: payload,
            };

        case SET_CURRENT_ASTEROID:
            return {
                ...state,
                currentAsteroid: payload,
            };

        case ADD_TO_DESTRUCTION_LIST: {
            const { allAsteroids } = state;
            const asteroidToDestruct = allAsteroids.find((item) => item.id === payload);

            if (asteroidToDestruct) {
                asteroidToDestruct.inDestructionList = true;
            }

            return state;
        }

        case SET_ERROR:
            return {
                ...state,
                error: payload,
            };

        default:
            return state;
    }
};

export default reducer;
