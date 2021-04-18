import { AnyAction } from 'redux';
import {
    SET_ALL_ASTEROIDS,
    SET_CURRENT_ASTEROID,
    ADD_TO_DESTRUCTION_LIST,
    SET_ERROR,
} from './actionTypes';
import State, { AsteroidShort } from './types';

const reducer = (state: State, action: AnyAction): State => {
    const { type, payload } = action;

    switch (type) {
        case SET_ALL_ASTEROIDS:
            return {
                ...state,
                allAsteroids: payload,
            };

        case SET_CURRENT_ASTEROID:
            return {
                ...state,
                currentAsteroid: payload,
            };

        case ADD_TO_DESTRUCTION_LIST: {
            const { allAsteroids } = state;
            const asteroidToDestruct = allAsteroids.find(
                (item) => item.id === payload
            ) as AsteroidShort;

            asteroidToDestruct.inDestructionList = true;

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
